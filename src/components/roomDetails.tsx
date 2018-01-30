import * as React from 'react';

import { MockRooms, MockReviews } from '@app/mockData';

type RoomDetailsProps = {
  match: {
    params: {
      id: number;
    };
  };
};

const RoomDetails: React.StatelessComponent<RoomDetailsProps> = props => {
  return <>{props.match.params.id}</>;
};

export { RoomDetails };
