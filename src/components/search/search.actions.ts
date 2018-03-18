import { getSearchResults } from './search.service';

export const SearchActionTypes = {
  SET_SEARCH_RESULTS_LOADING: 'SEARCH:SET_SEARCH_RESULTS_LOADING',
  ADD_SEARCH_RESULTS: 'SEARCH:ADD_SEARCH_RESULTS',
  ADD_SEARCH_RESULTS_ERROR: 'SEARCH:ADD_SEARCH_RESULTS_ERROR',
};

export const setSearchResultsLoading = (searchResultsLoading: boolean) => ({
  type: SearchActionTypes.SET_SEARCH_RESULTS_LOADING,
  searchResultsLoading,
});

export const addSearchResults = (searchResults: any[]) => ({
  type: SearchActionTypes.ADD_SEARCH_RESULTS,
  searchResults,
});

export const addSearchResultsError = (searchResultsError: string) => ({
  type: SearchActionTypes.ADD_SEARCH_RESULTS_ERROR,
  searchResultsError,
});

export const fetchSearchResults = (query: string) => (dispatch, getState) => {
  dispatch(setSearchResultsLoading(true));
  dispatch(addSearchResults([]));
  dispatch(addSearchResultsError(''));
  return getSearchResults(query)
    .then(results => {
      dispatch(setSearchResultsLoading(false));
      return dispatch(addSearchResults(results));
    })
    .catch(err => {
      dispatch(setSearchResultsLoading(false));
      dispatch(addSearchResultsError('Something went wrong'));
    });
};
