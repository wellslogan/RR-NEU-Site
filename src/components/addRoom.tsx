import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';
import * as _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApiService } from '@app/services/apiService';

import { stopLoading, startLoading } from '@app/_shared/actions';

type AddRoomState = {
  description?: string;
  latitude?: string;
  longitude?: string;
  location?: string;
  recaptchaResponse?: string;
  error?: string;
};

class AddRoomWithoutRouter extends React.Component<
  any & GeolocatedProps,
  AddRoomState
> {
  constructor(props) {
    super(props);
    this.props.dispatch(stopLoading());
    this.state = {
      latitude: _.get(props, 'coords.latitude', ''),
      longitude: _.get(props, 'coords.longitude', ''),
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(startLoading());
    this.setState({
      error: '',
    });
    ApiService.post('/api/restrooms/add', {
      restroom: {
        description: this.state.description,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        location: this.state.location,
      },
    }).then(res => {
      this.props.dispatch(stopLoading());
      if (res.success) {
        this.props.history.push('/');
        return;
      }
      this.setState({
        error: 'Something went wrong, please try again.',
      });
    });
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
            <label>Restroom Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={this.state.description}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="form-row">
            <label>Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={this.state.location}
              onChange={e => this.handleInputChange(e)}
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

const AddRoom = withRouter(connect()(AddRoomWithoutRouter));

export { AddRoom };
