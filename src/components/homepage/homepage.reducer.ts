import { Room } from '@models';
import { HomepageActionTypes } from '@app/components/homepage/homepage.actions';

export type HomepageState = {
  homepageRooms: Room[];
  homepageLoading: boolean;
  homepageError: string;
};

const initialHomepageState = {
  homepageRooms: [],
  homepageLoading: false,
  homepageError: '',
};

export const HomepageReducer = (
  state: HomepageState = initialHomepageState,
  action
) => {
  const handlers = {
    [HomepageActionTypes.ADD_HOMEPAGE_ROOMS]: () => ({
      ...state,
      homepageRooms: action.homepageRooms,
    }),
    [HomepageActionTypes.ADD_HOMEPAGE_ERROR]: () => ({
      ...state,
      homepageError: action.homepageError,
    }),
    [HomepageActionTypes.SET_HOMEPAGE_LOADING]: () => ({
      ...state,
      homepageLoading: action.homepageLoading,
    }),
  };

  const getNewState = handlers[action.type] || (() => state);

  return getNewState();
};
