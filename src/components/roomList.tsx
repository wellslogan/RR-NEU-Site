import * as React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Room } from '@models';
import { Loading } from '@app/components/loading';
import { RouteComponentProps } from 'react-router';

type RoomListProps = {
  rooms?: Room[];
};

const RoomList: React.StatelessComponent<RoomListProps> = props => {
  if (!props.rooms) {
    return null;
  }

  return (
    <>
      <h2>Results</h2>
      <ListGroup>
        {props.rooms.map(r => (
          <ListGroupItem>
            <ListGroupItemHeading>
              <Link to={'/room/' + r.id}>{r.description}</Link>
            </ListGroupItemHeading>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export { RoomList };
