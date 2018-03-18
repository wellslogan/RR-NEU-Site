import { Room } from '@models';
import { RoomDetailsActions } from './roomDetails.actions';

export type RoomDetailsState = {
  roomDetailsLoading: boolean;
  roomDetailsError: string;
  roomDetails?: Room;
};

const initialRoomDetailsState = {
  roomDetailsLoading: false,
  roomDetailsError: '',
};

export const roomDetailsReducer = (
  state: RoomDetailsState = initialRoomDetailsState,
  action
) => {
  const handlers = {
    [RoomDetailsActions.ADD_ROOM_DETAILS]: () => ({
      ...state,
      roomDetails: action.roomDetails,
    }),
    [RoomDetailsActions.ADD_ROOM_DETAILS_ERROR]: () => ({
      ...state,
      roomDetailsError: action.roomDetailsError,
    }),
    [RoomDetailsActions.SET_ROOM_DETAILS_LOADING]: () => ({
      ...state,
      roomDetailsLoading: action.roomDetailsLoading,
    }),
  };

  const getNewState = handlers[action.type] || (() => state);

  return getNewState();
};
