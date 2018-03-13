import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { orderBy } from 'lodash';

import { Room } from '@models';
import { RoomList } from '@app/components/roomList';
import { get } from '@shared/baseService';
import * as Actions from '@shared/actions';

type HomeProps = {} & GeolocatedProps;

type HomeState = {
  location?: any;
  query?: string;
  rooms?: Room[];
};

class Home extends React.Component<HomeProps & any, HomeState> {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
    this.props.dispatch(Actions.startLoading());
    get<any>('/api/restrooms').then(rooms => {
      this.props.dispatch(Actions.stopLoading());
      this.setState({
        rooms,
      });
    });
  }

  // componentWillReceiveProps(nextProps: HomeProps) {
  //   if (nextProps.coords) {
  //     get<any>(
  //       `/api/google/getLocationFromCoords?la=${nextProps.coords.latitude}&lo=${
  //         nextProps.coords.longitude
  //       }`
  //     ).then(res => {
  //       this.setState({
  //         query: res.address,
  //       });
  //     });
  //   }
  // }

  handleChange(text: string): void {
    this.setState({
      query: text,
    });
  }

  search(): void {
    get<any>('/api/restrooms').then(rooms => {
      this.setState({
        rooms,
      });
    });
  }

  render() {
    return (
      <section>
        <div className="homepage">
          <h1>Top Rated</h1>
          <div className="top-rated">
            {orderBy(
              this.state.rooms,
              [room => (room.averageRating == null ? -1 : room.averageRating)],
              ['desc']
            )
              .slice(0, 4)
              .map((r, idx) => (
                <RoomBox
                  key={idx}
                  room={r}
                  handleClick={() => {
                    this.props.history.push('/room/' + r.id);
                  }}
                />
              ))}
          </div>
          <h1>Recently Added</h1>
          <div className="top-rated">
            {orderBy(this.state.rooms, ['createDate'], ['desc'])
              .slice(0, 4)
              .map((r, idx) => (
                <RoomBox
                  key={idx}
                  room={r}
                  handleClick={() => {
                    this.props.history.push(`/room/${r.id}`);
                  }}
                />
              ))}
          </div>
        </div>
      </section>
    );
  }
}

const RoomBox = ({ room, ...props }) => {
  return (
    <div className="room" onClick={() => props.handleClick()}>
      <span className="description">{room.description}</span>
      <span className="averageRating">
        {room.averageRating == null ? (
          <small>No reviews</small>
        ) : (
          `${room.averageRating}/10`
        )}
      </span>
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
