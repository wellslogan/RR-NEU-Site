import { Room, Review, AppState } from '@models';
import {
  getRoom,
  addReview,
  SubmitReviewResponse,
  deleteReview,
  SubmitReviewRequest,
} from './room.service';

export const RoomDetailsActions = {
  ADD_ROOM_DETAILS: 'ROOM_DETAILS:ADD_ROOM_DETAILS',
  SET_ROOM_DETAILS_LOADING: 'ROOM_DETAILS:SET_ROOM_DETAILS_LOADING',
  ADD_ROOM_DETAILS_ERROR: 'ROOM_DETAILS:ADD_ROOM_DETAILS_ERROR',
};

export const addRoomDetails = (roomDetails: Room) => ({
  type: RoomDetailsActions.ADD_ROOM_DETAILS,
  roomDetails,
});

export const setRoomDetailsLoading = (roomDetailsLoading: boolean) => ({
  type: RoomDetailsActions.SET_ROOM_DETAILS_LOADING,
  roomDetailsLoading,
});

export const addRoomDetailsError = (roomDetailsError: string) => ({
  type: RoomDetailsActions.ADD_ROOM_DETAILS_ERROR,
  roomDetailsError,
});

export const fetchRoomDetailsAsync = (id: number) => (dispatch, getState) => {
  dispatch(setRoomDetailsLoading(true));
  dispatch(addRoomDetailsError(''));
  dispatch(addRoomDetails(undefined));

  return getRoom(id)
    .then(result => {
      dispatch(setRoomDetailsLoading(false));
      dispatch(addRoomDetails(result));
    })
    .catch(() => {
      dispatch(setRoomDetailsLoading(false));
      dispatch(
        addRoomDetailsError('Something went wrong loading this restroom.')
      );
    });
};

export const addReviewAsync = (review: SubmitReviewRequest) => (
  dispatch,
  getState: () => AppState
) => {
  dispatch(setRoomDetailsLoading(true));
  dispatch(addRoomDetailsError(''));

  return addReview(review)
    .then((result: SubmitReviewResponse) => {
      dispatch(setRoomDetailsLoading(false));
      if (result.success) {
        const originalDetails = getState().roomDetails.roomDetails;
        dispatch(
          addRoomDetails({
            ...originalDetails,
            reviews: [result.review, ...originalDetails.reviews],
          })
        );
      } else if (result.error === 'ALREADY_EXISTS') {
        dispatch(addRoomDetailsError("You've already reviewed this restroom."));
      } else {
        dispatch(addRoomDetailsError('Something went wrong.'));
      }
    })
    .catch(err => {
      dispatch(addRoomDetailsError('Something went wrong.'));
    });
};

export const deleteReviewAsync = (id: number) => (
  dispatch,
  getState: () => AppState
) => {
  dispatch(setRoomDetailsLoading(true));
  dispatch(addRoomDetailsError(''));

  return deleteReview(id)
    .then((result: { success: boolean }) => {
      dispatch(setRoomDetailsLoading(false));
      if (result.success) {
        const originalDetails = getState().roomDetails.roomDetails;
        dispatch(
          addRoomDetails({
            ...originalDetails,
            reviews: originalDetails.reviews.filter(r => r.id !== id),
          })
        );
        return result;
      } else {
        dispatch(addRoomDetailsError('Could not delete review.'));
      }
    })
    .catch(err => {
      dispatch(setRoomDetailsLoading(false));
      dispatch(addRoomDetailsError('Something went wrong.'));
    });
};
