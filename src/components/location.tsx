import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';

class Location extends React.Component<{} & GeolocatedProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const text = '';
    if (!this.props.isGeolocationAvailable) {
      return (
        <p className="text-center">
          <sup>Geolocation not supported :(</sup>
        </p>
      );
    }

    if (!this.props.isGeolocationEnabled) {
      return (
        <p className="text-center">
          <sup>Geolocation not enabled :/</sup>
        </p>
      );
    }

    return !this.props.coords ? (
      <p className="text-center">
        <sup>Getting your location...</sup>
      </p>
    ) : (
      <p className="text-center">
        <sup>{`Location found! (${this.props.coords.latitude}, ${
          this.props.coords.longitude
        })`}</sup>
      </p>
    );
  }
}

export { Location };
