import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';
import * as _ from 'lodash';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import Icon from 'react-icons-kit';
import { man } from 'react-icons-kit/icomoon/man';
import { woman } from 'react-icons-kit/icomoon/woman';
import { manWoman } from 'react-icons-kit/icomoon/manWoman';
import { questionCircle } from 'react-icons-kit/fa/questionCircle';

import { Loading } from '@app/components';
import { addLocation } from '@shared/globalRedux/global.actions';
import { RestroomGender, AppState } from '@models';
import { addRoomAsync, addAddRoomError } from './addRoom.actions';
import { AddRoomRequest } from './addRoom.service';

type AddRoomProps = {
  addLocation: (location: any) => void;
  addAddRoomError: (error: string) => any;
  addRoomAsync: (addRoomReq: AddRoomRequest) => any;
  storedLocation: { formatted_address: string, latitude: string, longitude: string };
  error: string;
  loading: boolean;
} & GeolocatedProps & RouteComponentProps<{}>;

type AddRoomState = {
  description?: string;
  latitude?: string;
  longitude?: string;
  location?: string;
  recaptchaResponse?: string;
  useCurrentLocation?: boolean;
  restroomGender?: RestroomGender;
};

class AddRoomWithoutRouter extends React.Component<
  AddRoomProps,
  AddRoomState
> {
  constructor(props) {
    super(props);
    this.state = {
      useCurrentLocation: false
    };
    this.props.addAddRoomError('');
  }

  calculateAndUseLocation = event => {
    if (!event.target.checked) {
      this.setState({
        useCurrentLocation: false,
        location: '',
      });
      return;
    }

    this.setState({
      useCurrentLocation: true,
    });

    // we already have lat and long from the store. Use it instead of making a new
    // google request
    if (this.props.storedLocation.formatted_address) {
      return this.setState({
        location: this.props.storedLocation.formatted_address
      })
    }

    const Geocoder = new (window as any).google.maps.Geocoder();
    Geocoder.geocode(
      {
        location: {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
        },
      },
      (resultsArr, status) => {
        if (status === 'OK') {
          // add this info to the store
          this.props.addLocation({
            formatted_address: resultsArr[0].formatted_address,
            latitude: this.props.coords.latitude,
            longitude: this.props.coords.longitude
          });
          this.setState({
            location: resultsArr[0].formatted_address,
          });
        }
      }
    );
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.recaptchaResponse) {
      this.props.addAddRoomError('You must fill out the recaptcha form.');
      return;
    }

    if (!this.state.description || !this.state.location) {
      this.props.addAddRoomError('* denotes required fields.');
      return;
    }

    const submitRoom = ({location, latitude, longitude}) => {
      this.props.addRoomAsync({
        restroom: {
          description: this.state.description,
          restroomGender: this.state.restroomGender,
          location,
          latitude,
          longitude
        },
        recaptchaResponse: this.state.recaptchaResponse
      })
        .then(response => {
          if (response.success) {
            this.props.history.push('/')
          }
        });
    }

    // we're using an address from the google location search. Need to get the coords
    // for this address from google first
    if (!this.state.useCurrentLocation && this.state.location) {
      geocodeByAddress(this.state.location)
      .then(resultsArray => {
        const loc = _.get(resultsArray, '[0].geometry.location');
        if (loc) {
          return submitRoom({
            location: this.state.location,
            latitude: loc.lat(),
            longitude: loc.lng(),
          })
        }
      });
    }

    // we're using the current location, so we should have the address info in the store
    if (this.state.useCurrentLocation && this.props.storedLocation.formatted_address) {
      return submitRoom({
        location: this.props.storedLocation.formatted_address,
        latitude: this.props.storedLocation.latitude,
        longitude: this.props.storedLocation.longitude,
      })
    }
  };

  setGender = (gender: RestroomGender) => {
    this.setState(prevState => ({
        restroomGender: prevState.restroomGender === gender ? undefined : gender
      }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords) {
      this.setState({
        latitude: nextProps.coords.latitude,
        longitude: nextProps.coords.longitude,
      });
    }
  }

  render() {
    if (this.props.loading) {
      return <Loading/>;
    }

    return (
      <section>
        <h1>Add a new Restroom</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
        {this.props.error ? (
          <div className="form-row"><span className="error">{this.props.error}</span></div>
        ) : null}
          <div className="form-row">
            <label>Restroom Description*</label>
            <input
              type="text"
              id="description"
              name="description"
              value={this.state.description}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="form-row">
            <label>Restroom Gender</label>
            <div className="set-restroom-gender">
              <Icon className={this.state.restroomGender === RestroomGender.MALE ? 'male active' : 'male'} icon={man} size={54} onClick={() => this.setGender(RestroomGender.MALE)}/>
              <Icon className={this.state.restroomGender === RestroomGender.FEMALE ? 'female active' : 'female'} icon={woman} size={54} onClick={() => this.setGender(RestroomGender.FEMALE)}/>
              <Icon className={this.state.restroomGender === RestroomGender.ALLGENDER ? 'allgender active' : 'allgender'} icon={manWoman} size={54} onClick={() => this.setGender(RestroomGender.ALLGENDER)}/>
            </div>
          </div>
          <div className="form-row">
            <label>Location*</label>
            <input
              type="checkbox"
              checked={this.state.useCurrentLocation}
              onChange={e => this.calculateAndUseLocation(e)}
              disabled={
                !this.props.isGeolocationAvailable ||
                !this.props.isGeolocationEnabled ||
                !this.props.coords
              }
            />
            <span>Use my current location</span>
            <PlacesAutocomplete
              inputProps={{
                value: this.state.location,
                onChange: val => {
                  this.handleInputChange({
                    target: {
                      name: 'location',
                      value: val,
                    },
                  });
                },
                id: 'location',
                name: 'location',
                disabled: this.state.useCurrentLocation,
              }}
            />
          </div>
          <div className="form-row">
            <ReCAPTCHA
              ref="recaptcha"
              sitekey="6LcBDEQUAAAAAIB2kbmEh7eChcdxB6jPu4MBYWBx"
              onChange={val =>
                this.handleInputChange({
                  target: {
                    name: 'recaptchaResponse',
                    value: val,
                  },
                })
              }
            />
          </div>
          <div className="form-row">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  storedLocation: state.global.location,
  ...state.addRoom
});

const mapDispatchToProps = {
  addLocation,
  addAddRoomError,
  addRoomAsync,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddRoomWithoutRouter)
);
