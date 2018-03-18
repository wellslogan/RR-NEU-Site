import { SearchActionTypes } from './search.actions';

export type SearchState = {
  searchResults: any[];
  searchResultsLoading: boolean;
  searchResultsError: string;
};

export const initialSearchState: SearchState = {
  searchResults: [],
  searchResultsLoading: false,
  searchResultsError: '',
};

export const searchReducer = (
  state: SearchState = initialSearchState,
  action
) => {
  const handlers = {
    [SearchActionTypes.SET_SEARCH_RESULTS_LOADING]: () => ({
      ...state,
      searchResultsLoading: action.searchResultsLoading,
    }),
    [SearchActionTypes.ADD_SEARCH_RESULTS]: () => ({
      ...state,
      searchResults: action.searchResults,
    }),
    [SearchActionTypes.ADD_SEARCH_RESULTS_ERROR]: () => ({
      ...state,
      searchResultsError: action.searchResultsError,
    }),
  };

  const getNewState = handlers[action.type] || (() => state);

  return getNewState();
};
