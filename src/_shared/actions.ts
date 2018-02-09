export const ActionTypes = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  ADD_LOCATION: 'ADD_LOCATION',
  ADD_SEARCH_QUERY: 'ADD_SEARCH_QUERY',
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
