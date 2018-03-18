import { Review } from '@models';
import { getCurrentUserReviews } from '@app/components/profile/profile.service';

export const ProfileActionTypes = {
  ADD_PROFILE_REVIEWS: 'PROFILE:ADD_PROFILE_REVIEWS',
  SET_PROFILE_LOADING: 'PROFILE:SET_PROFILE_LOADING',
  ADD_PROFILE_ERROR: 'PROFILE:ADD_PROFILE_ERROR',
};

export const addProfileReviews = (profileReviews: Review[]) => ({
  type: ProfileActionTypes.ADD_PROFILE_REVIEWS,
  profileReviews,
});

export const setProfileLoading = (profileLoading: boolean) => ({
  type: ProfileActionTypes.SET_PROFILE_LOADING,
  profileLoading,
});

export const addProfileError = (profileError: string) => ({
  type: ProfileActionTypes.ADD_PROFILE_ERROR,
  profileError,
});

export const fetchProfileReviews = () => dispatch => {
  dispatch(setProfileLoading(true));
  dispatch(addProfileError(''));
  return getCurrentUserReviews()
    .then(reviews => {
      dispatch(setProfileLoading(false));
      return dispatch(addProfileReviews(reviews));
    })
    .catch(err => {
      dispatch(setProfileLoading(false));
      dispatch(addProfileError('Something went wrong.'));
    });
};
