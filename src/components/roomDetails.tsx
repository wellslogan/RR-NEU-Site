import * as React from 'react';
import { Room } from '@app/models/room';
import { ApiService } from '@app/services/apiService';
import { Loading } from '@app/components/loading';

// import { MockRooms, MockReviews } from '@app/mockData';

type RoomDetailsProps = {
  match: {
    params: {
      id: number;
    };
  };
};

type RoomDetailsState = {
  loading: boolean;
  room?: Room;
};

class RoomDetails extends React.Component<RoomDetailsProps, RoomDetailsState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    ApiService.get('/api/restrooms/' + props.match.params.id).then(room =>
      this.setState({
        loading: false,
        room,
      })
    );
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <>
        <h2>{this.state.room.description}</h2>
        <p>
          Coordinates: {this.state.room.latitude}, {this.state.room.longitude}
        </p>
        <p>
          <sup>Added on {this.state.room.createDate}</sup>
        </p>
      </>
    );
  }
}

export { RoomDetails };
