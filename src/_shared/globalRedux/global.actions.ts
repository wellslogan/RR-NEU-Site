import { Session } from '@app/_shared/models/session';

export const GlobalActionTypes = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  ADD_LOCATION: 'ADD_LOCATION',
  ADD_LOCATION_ENABLED: 'ADD_LOCATION_ENABLED',
  ADD_SEARCH_QUERY: 'ADD_SEARCH_QUERY',
  ADD_SESSION: 'ADD_SESSION',
  CLEAR_SESSION: 'CLEAR_SESSION',
};

export const startLoading = () => ({
  type: GlobalActionTypes.START_LOADING,
});

export const stopLoading = () => ({
  type: GlobalActionTypes.STOP_LOADING,
});

export const addLocation = (location: {
  formated_address;
  latitude;
  longitude;
}) => ({
  type: GlobalActionTypes.ADD_LOCATION,
  location: location,
});

export const addLocationEnabled = (enabled: boolean) => ({
  type: GlobalActionTypes.ADD_LOCATION_ENABLED,
  enabled,
});

export const addSearchQuery = (query: string) => ({
  type: GlobalActionTypes.ADD_SEARCH_QUERY,
  query,
});

export const addSession = (session: Session) => ({
  type: GlobalActionTypes.ADD_SESSION,
  session,
});

export const clearSession = () => ({
  type: GlobalActionTypes.CLEAR_SESSION,
});
