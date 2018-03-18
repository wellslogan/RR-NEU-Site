import * as React from 'react';
import { GeolocatedProps } from 'react-geolocated';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { orderBy } from 'lodash';

import { Room, AppState } from '@models';
import { Loading } from '@app/components';
import { fetchHomepageRooms } from './homepage.actions';
import { RoomBox } from './roomBox';

type HomeProps = {
  fetchHomepageRooms: () => any;
  homepageRooms: Room[];
  homepageLoading: boolean;
  homepageError: string;
} & GeolocatedProps &
  RouteComponentProps<{}>;

class Home extends React.Component<HomeProps, {}> {
  constructor(props) {
    super(props);

    // don't fetch rooms if they're already in the store
    if (!this.props.homepageRooms || !this.props.homepageRooms.length) {
      this.props.fetchHomepageRooms();
    }
  }

  render() {
    if (this.props.homepageLoading) {
      return <Loading />;
    }
    return (
      <section>
        <div className="homepage">
          <h1>Top Rated</h1>
          <div className="top-rated">
            {orderBy(
              this.props.homepageRooms,
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
            {orderBy(this.props.homepageRooms, ['createDate'], ['desc'])
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

const mapStateToProps = (state: AppState, ownProps) => ({
  ...state.homepage,
});

const mapDispatchToProps = {
  fetchHomepageRooms,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
