import * as React from 'react';
import { connect } from 'react-redux';
import { stopLoading, startLoading } from '@shared/globalRedux/global.actions';
import { get } from '@shared/baseService';
import { Link } from 'react-router-dom';
import { AppState, Room } from '@models';
import { fetchSearchResults } from './search.actions';
import { Loading } from '@app/components';

type SearchResultsProps = {
  query: string;
  searchResults: Room[];
  searchResultsLoading: boolean;
  searchResultsError: string;
  fetchSearchResults: (query: string) => Promise<Room[]>;
};

class SearchResults extends React.Component<SearchResultsProps, any> {
  constructor(props) {
    super(props);

    this.search(props.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.search(nextProps.query);
    }
  }

  search = query => {
    if (query && query.trim()) {
      this.props.fetchSearchResults(this.props.query);
    }
  };

  render() {
    if (this.props.searchResultsLoading) {
      return <Loading />;
    }

    return (
      <section>
        <h1>Search Results</h1>
        {!this.props.searchResultsError ? null : (
          <span className="error">
            {this.props.searchResultsError}
            <br />
          </span>
        )}
        {!this.props.searchResults.length ? (
          'No results'
        ) : (
          <ul className="search-results">
            {this.props.searchResults.map((r, idx) => (
              <li key={idx}>
                <Link to={`/room/${r.id}`}>{r.description}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  query: state.global.query,
  ...state.search,
});

const mapDispatchToProps = {
  fetchSearchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
