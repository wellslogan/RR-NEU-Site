import * as React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Room } from '@app/models/room';
import { Loading } from '@app/components/loading';
import { RouteComponentProps } from 'react-router';

type RoomListProps = {
  rooms?: Room[];
};

const RoomList: React.StatelessComponent<RoomListProps> = props => {
  if (!props.rooms) {
    return <Loading />;
  }

  return (
    <>
      <h2>Results</h2>
      <ListGroup>
        {props.rooms.map(r => (
          <ListGroupItem>
            <ListGroupItemHeading>
              <Link to={'/rooms/' + r.id}>{r.description}</Link>
            </ListGroupItemHeading>
            <ListGroupItemText>{r.location.address}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export { RoomList };
