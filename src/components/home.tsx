import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Room } from '@app/models/room';
import { MockRooms } from '@app/mockData';
import { RoomList } from '@app/components/roomList';
import { ApiService } from '@app/services/apiService';
import * as Actions from '@app/_shared/actions';

type HomeProps = {} & GeolocatedProps;

type HomeState = {
  location?: any;
  query?: string;
  rooms?: Room[];
};

const rooms = [
  { description: '4th Floor Snell Library', id: 0 },
  { description: '3rd Floor Snell Library', id: 0 },
  { description: '4th Floor Snell Library', id: 0 },
  { description: '4th Floor Snell Library', id: 0 },
];

class Home extends React.Component<HomeProps & any, HomeState> {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
    this.props.dispatch(Actions.startLoading());
    ApiService.get('/api/restrooms').then(rooms => {
      this.props.dispatch(Actions.stopLoading());
      this.setState({
        rooms,
      });
    });
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
      <section>
        <div className="homepage">
          <h1>Top Rated Near You</h1>
          <div className="top-rated">
            {this.state.rooms.slice(0, 4).map((r, idx) => (
              <RoomBox
                key={idx}
                description={r.description}
                handleClick={() => {
                  this.props.history.push('/room/' + r.id);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const RoomBox = props => {
  return (
    <div className="room" onClick={() => props.handleClick()}>
      <span>{props.description}</span>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    location: state.location,
  };
};

const HomeWithRouter = withRouter(connect(mapStateToProps)(Home));

export { HomeWithRouter as Home };
