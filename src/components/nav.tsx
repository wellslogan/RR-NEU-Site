import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addSearchQuery } from '@app/_shared/actions';

class SiteNav extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      state: props.state,
    };
  }

  handleInput = value => {
    this.setState({
      query: value,
    });
  };

  render() {
    return (
      <header>
        <div className="logo">
          <Link to="/">NEU Restroom Review</Link>
        </div>
        <div className="search">
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.query && this.state.query !== '') {
                this.props.dispatch(addSearchQuery(this.state.query));
                this.props.history.push('/search');
              }
            }}
          >
            <input
              type="text"
              placeholder="search for restrooms"
              id="search"
              value={this.state.query}
              onChange={e => this.handleInput(e.target.value)}
              onFocus={e => (e.target as any).select()}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="action-bar">
          <Link to="/add" className="action-bar-item">
            Add a Restroom
          </Link>
          <Link to="/login" className="action-bar-item">
            Login
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.query,
  };
};

const wrSiteNav = withRouter(connect(mapStateToProps)(SiteNav));

export { wrSiteNav as SiteNav };
