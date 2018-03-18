import { AddRoomActionTypes } from './addRoom.actions';

export type AddRoomState = {
  error: string;
  loading: boolean;
};

const addRoomInitialState = {
  error: '',
  loading: false,
};

export const addRoomReducer = (
  state: AddRoomState = addRoomInitialState,
  action
) => {
  const handlers = {
    [AddRoomActionTypes.ADD_ADD_ROOM_ERROR]: () => ({
      ...state,
      error: action.error,
    }),
    [AddRoomActionTypes.SET_ADD_ROOM_LOADING]: () => ({
      ...state,
      loading: action.loading,
    }),
  };

  const getNewState = handlers[action.type] || (() => state);

  return getNewState();
};
