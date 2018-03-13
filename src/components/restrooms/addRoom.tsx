import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';
import * as _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRoom } from './room.service';
import ReCAPTCHA from 'react-google-recaptcha';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress } from 'react-places-autocomplete';

import { stopLoading, startLoading, addLocation } from '@shared/actions';

type AddRoomProps = {
  startLoading: () => void;
  stopLoading: () => void;
  addLocation: (location: any) => void;
  history: any; // from react-router
  storedLocation: { formatted_address: string, latitude: string, longitude: string };
} & GeolocatedProps;

type AddRoomState = {
  description?: string;
  latitude?: string;
  longitude?: string;
  location?: string;
  recaptchaResponse?: string;
  error?: string;
  useCurrentLocation?: boolean;
};

class AddRoomWithoutRouter extends React.Component<
  AddRoomProps,
  AddRoomState
> {
  constructor(props) {
    super(props);
    this.props.stopLoading();
    this.state = {
      useCurrentLocation: false
    };
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
    this.setState({ error: '' });

    if (!this.state.recaptchaResponse) {
      return this.setState({
        error: 'You must fill out the recaptcha form.',
      });
    }

    if (!this.state.description || !this.state.location) {
      return this.setState({
        error: 'Both fields are required!',
      });
    }

    const submitRoom = ({locationStr, lat, lng}) => {
      this.props.startLoading();
      addRoom({
        restroom: {
          description: this.state.description,
          latitude: lat,
          longitude: lng,
          location: this.state.location,
        },
        recaptchaResponse: this.state.recaptchaResponse,
      })
        .then(res => {
          this.props.stopLoading();
          if (res.success) {
            this.props.history.push('/');
            return;
          }
          this.setState({
            error: 'Something went wrong, please try again.',
          });
        })
        .catch(err => {
          this.props.stopLoading();
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
            locationStr: this.state.location,
            lat: loc.lat(),
            lng: loc.lng(),
          })
        }
      });
    }

    // we're using the current location, so we should have the address info in the store
    if (this.state.useCurrentLocation && this.props.storedLocation.formatted_address) {
      return submitRoom({
        locationStr: this.props.storedLocation.formatted_address,
        lat: this.props.storedLocation.latitude,
        lng: this.props.storedLocation.longitude,
      })
    }

    
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords) {
      this.setState({
        latitude: nextProps.coords.latitude,
        longitude: nextProps.coords.longitude,
      });
    }
  }

  render() {
    return (
      <section>
        <h1>Add a new Restroom</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
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
        {this.state.error && this.state.error !== '' ? (
          <span className="error">{this.state.error}</span>
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  storedLocation: state.location
});

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  addLocation,
};

const AddRoom = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddRoomWithoutRouter)
);

export { AddRoom };
