import * as React from 'react';
import { connect } from 'react-redux';
import { stopLoading, startLoading } from '@app/_shared/actions';
import { ApiService } from '@app/services/apiService';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
    if (props.query && props.query !== '') {
      this.search(props.query);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.query &&
      nextProps.query !== '' &&
      nextProps.query !== this.props.query
    ) {
      this.search(nextProps.query);
    }
  }

  search = query => {
    this.props.dispatch(startLoading());
    ApiService.get('/api/restrooms/search?q=' + query).then(res => {
      this.props.dispatch(stopLoading());
      this.setState({
        rooms: res,
      });
    });
  };

  render() {
    return (
      <section>
        <h1>Search Results</h1>
        {!this.state.rooms ? (
          'No results'
        ) : (
          <ul className="search-results">
            {this.state.rooms.map((r, idx) => {
              return (
                <li key={idx}>
                  <Link to={'/room/' + r.id}>{r.description}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  query: state.query,
});

const wr = connect(mapStateToProps)(SearchResults);

export { wr as SearchResults };
