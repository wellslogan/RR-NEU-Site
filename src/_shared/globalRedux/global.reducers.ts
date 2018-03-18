import { GlobalActionTypes } from './global.actions';

export type GlobalState = {
  loading: boolean;
  rooms: any[];
  location: any;
  query: string;
  session?: any;
};

const initialGlobalState = {
  loading: false,
  rooms: [],
  location: {},
  query: '',
};

export const globalReducer = (state = initialGlobalState, action) => {
  const actionMap = {
    [GlobalActionTypes.START_LOADING]: { ...state, loading: true },
    [GlobalActionTypes.STOP_LOADING]: { ...state, loading: false },
    [GlobalActionTypes.ADD_LOCATION]: {
      ...state,
      location: action.location,
      locationEnabled: true,
    },
    [GlobalActionTypes.ADD_LOCATION_ENABLED]: {
      ...state,
      locationEnabled: action.enabled,
    },
    [GlobalActionTypes.ADD_SEARCH_QUERY]: { ...state, query: action.query },
    [GlobalActionTypes.ADD_SESSION]: { ...state, session: action.session },
    [GlobalActionTypes.CLEAR_SESSION]: { ...state, session: undefined },
  };

  return actionMap[action.type] || state;
};
