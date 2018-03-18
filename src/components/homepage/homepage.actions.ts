import { Room } from '@models';
import { getHomepageRooms } from '@app/components/homepage/homepage.service';

export const HomepageActionTypes = {
  ADD_HOMEPAGE_ROOMS: 'HOMEPAGE:ADD_HOMEPAGE_ROOMS',
  SET_HOMEPAGE_LOADING: 'HOMEPAGE:SET_HOMEPAGE_LOADING',
  ADD_HOMEPAGE_ERROR: 'HOMEPAGE:ADD_HOMEPAGE_ERROR',
};

export const addHomepageRooms = (homepageRooms: Room[]) => ({
  type: HomepageActionTypes.ADD_HOMEPAGE_ROOMS,
  homepageRooms,
});

export const addHomepageError = (homepageError: string) => ({
  type: HomepageActionTypes.ADD_HOMEPAGE_ERROR,
  homepageError,
});

export const setHomepageLoading = (homepageLoading: boolean) => ({
  type: HomepageActionTypes.SET_HOMEPAGE_LOADING,
  homepageLoading,
});

export const fetchHomepageRooms = () => dispatch => {
  dispatch(setHomepageLoading(true));
  dispatch(addHomepageError(''));

  return getHomepageRooms()
    .then(rooms => {
      dispatch(setHomepageLoading(false));
      dispatch(addHomepageRooms(rooms));
    })
    .catch(err => {
      dispatch(setHomepageLoading(false));
      dispatch(addHomepageError('Something went wrong.'));
    });
};
