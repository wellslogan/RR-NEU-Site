import { Session } from '@app/_shared/models/session';

export const ActionTypes = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  ADD_LOCATION: 'ADD_LOCATION',
  ADD_SEARCH_QUERY: 'ADD_SEARCH_QUERY',
  ADD_SESSION: 'ADD_SESSION',
  CLEAR_SESSION: 'CLEAR_SESSION',
};

export const startLoading = () => ({
  type: ActionTypes.START_LOADING,
});

export const stopLoading = () => ({
  type: ActionTypes.STOP_LOADING,
});

export const addLocation = (location: { latitude; longitude }) => ({
  type: ActionTypes.ADD_LOCATION,
  location: location,
});

export const addSearchQuery = (query: string) => ({
  type: ActionTypes.ADD_SEARCH_QUERY,
  query,
});

export const addSession = (session: Session) => ({
  type: ActionTypes.ADD_SESSION,
  session,
});

export const clearSession = () => ({
  type: ActionTypes.CLEAR_SESSION,
});
