import { ActionTypes } from './actions';

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
    [ActionTypes.ADD_LOCATION]: {
      ...state,
      location: action.location,
      locationEnabled: true,
    },
    [ActionTypes.ADD_LOCATION_ENABLED]: {
      ...state,
      locationEnabled: action.enabled,
    },
    [ActionTypes.ADD_SEARCH_QUERY]: { ...state, query: action.query },
    [ActionTypes.ADD_SESSION]: { ...state, session: action.session },
    [ActionTypes.CLEAR_SESSION]: { ...state, session: undefined },
  };

  return actionMap[action.type] || state;
};
