import { ActionTypes } from './actions';

export type AppState = {
  loading: boolean;
  rooms: any[];
  location: any;
  query: string;
};

const initialState = {
  loading: false,
  rooms: [],
  location: {},
  query: '',
};

export const appReducer = (state = initialState, action) => {
  const actionMap = {
    [ActionTypes.START_LOADING]: { ...state, loading: true },
    [ActionTypes.STOP_LOADING]: { ...state, loading: false },
    [ActionTypes.ADD_LOCATION]: { ...state, location: action.location },
    [ActionTypes.ADD_SEARCH_QUERY]: { ...state, query: action.query },
  };

  return actionMap[action.type] || state;
};
