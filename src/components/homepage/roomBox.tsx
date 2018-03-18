import * as React from 'react';
import { precisionRound } from '@shared/utils';
import { Room } from '@models';

type RoomBoxProps = {
  room: Room;
  handleClick: () => any;
};

export const RoomBox: React.StatelessComponent<RoomBoxProps> = ({
  room,
  handleClick,
}) => {
  return (
    <div className="room" onClick={handleClick}>
      <span className="description">{room.description}</span>
      <span className="averageRating">
        {room.averageRating == null ? (
          <small>No reviews</small>
        ) : (
          `${precisionRound(room.averageRating, 1)}/10 ${
            room.reviews ? `(${room.reviews.length})` : ''
          }`
        )}
      </span>
    </div>
  );
};
