import { Review } from '@models';
import { ProfileActionTypes } from '@app/components/profile/profile.actions';

export type ProfileState = {
  profileReviews: Review[];
  profileLoading: boolean;
  profileError: string;
};

export const initialProfileState = {
  profileReviews: [],
  profileLoading: false,
  profileError: '',
};

export const profileReducer = (
  state: ProfileState = initialProfileState,
  action
) => {
  const handlers = {
    [ProfileActionTypes.ADD_PROFILE_REVIEWS]: () => ({
      ...state,
      profileReviews: action.profileReviews,
    }),
    [ProfileActionTypes.ADD_PROFILE_ERROR]: () => ({
      ...state,
      profileError: action.profileError,
    }),
    [ProfileActionTypes.SET_PROFILE_LOADING]: () => ({
      ...state,
      profileLoading: action.profileLoading,
    }),
  };

  const getNewState = handlers[action.type] || (() => state);

  return getNewState();
};
