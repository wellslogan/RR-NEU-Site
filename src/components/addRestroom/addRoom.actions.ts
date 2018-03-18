import {
  AddRoomRequest,
  addRoom,
  AddRoomResponse,
} from '@app/components/addRestroom/addRoom.service';

export const AddRoomActionTypes = {
  SET_ADD_ROOM_LOADING: 'ADD_ROOM:SET_ADD_ROOM_LOADING',
  ADD_ADD_ROOM_ERROR: 'ADD_ROOM:ADD_ADD_ROOM_ERROR',
};

export const addAddRoomError = (error: string) => ({
  type: AddRoomActionTypes.ADD_ADD_ROOM_ERROR,
  error,
});

export const setAddRoomLoading = (loading: boolean) => ({
  type: AddRoomActionTypes.SET_ADD_ROOM_LOADING,
  loading,
});

export const addRoomAsync = (roomReq: AddRoomRequest) => dispatch => {
  dispatch(setAddRoomLoading(true));
  dispatch(addAddRoomError(''));
  return addRoom(roomReq)
    .then((result: AddRoomResponse) => {
      dispatch(setAddRoomLoading(false));
      if (!result.success) {
        dispatch(addAddRoomError('Something went wrong, please try again.'));
      }
      return result;
    })
    .catch(err => {
      dispatch(setAddRoomLoading(false));
      dispatch(addAddRoomError('Something went wrong, please try again.'));
    });
};
