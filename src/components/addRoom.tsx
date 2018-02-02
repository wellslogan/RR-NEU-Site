import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';
import * as _ from 'lodash';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ApiService } from '@app/services/apiService';
import { withRouter } from 'react-router-dom';

type AddRoomState = {
  description?: string;
  latitude?: string;
  longitude?: string;
};

class AddRoomWithoutRouter extends React.Component<
  any & GeolocatedProps,
  AddRoomState
> {
  constructor(props) {
    super(props);
    this.state = {
      latitude: _.get(props, 'coords.latitude', ''),
      longitude: _.get(props, 'coords.longitude', ''),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    ApiService.post('/api/restrooms/add', {
      ...this.state,
    }).then(res => {
      this.props.location.push('/');
    });
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
    return (
      <Row>
        <Col sm="12">
          <h2>Add a Restroom</h2>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Label for="description">Description*</Label>
              <Input
                value={this.state.description}
                onChange={e => this.handleInputChange.call(this, e)}
                type="text"
                name="description"
                id="description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Latitude*</Label>
              <Input
                value={this.state.latitude}
                onChange={e => this.handleInputChange.call(this, e)}
                type="text"
                name="latitude"
                id="latitude"
              />
            </FormGroup>
            <FormGroup>
              <Label for="longitude">Longitude*</Label>
              <Input
                value={this.state.longitude}
                onChange={e => this.handleInputChange.call(this, e)}
                type="text"
                name="longitude"
                id="longitude"
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

const AddRoom = withRouter(AddRoomWithoutRouter);

export { AddRoom };
