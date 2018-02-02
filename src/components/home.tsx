import * as React from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { GeolocatedProps } from 'react-geolocated';

import { Room } from '@app/models/room';
import { MockRooms } from '@app/mockData';
import { RoomList } from '@app/components/roomList';
import { ApiService } from '@app/services/apiService';

type HomeProps = {} & GeolocatedProps;

type HomeState = {
  location?: any;
  query?: string;
  rooms?: Room[];
};

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps: HomeProps) {
    if (nextProps.coords) {
      ApiService.get(
        `/api/google/getLocationFromCoords?la=${nextProps.coords.latitude}&lo=${
          nextProps.coords.longitude
        }`
      ).then(res => {
        this.setState({
          query: res.address,
        });
      });
    }
  }

  handleChange(text: string): void {
    this.setState({
      query: text,
    });
  }

  search(): void {
    ApiService.get('/api/restrooms').then(rooms => {
      this.setState({
        rooms,
      });
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Form>
              <FormGroup>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter an address, city, or zip code"
                    value={this.state.query}
                    onChange={e => this.handleChange.call(this, e.target.value)}
                  />
                  <InputGroupAddon>
                    <Button
                      color="secondary"
                      onClick={e => this.search.call(this)}
                    >
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <RoomList rooms={this.state.rooms} />
          </Col>
        </Row>
      </>
    );
  }
}

export { Home };
