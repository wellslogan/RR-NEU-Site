import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import Icon from 'react-icons-kit';
import { navicon } from 'react-icons-kit/fa/navicon';
import { close as closeIcon } from 'react-icons-kit/fa/close';

import { addSearchQuery } from '@shared/actions';

class SiteNav extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      state: props.state,
      menuVisible: false,
    };
  }

  handleInput = value => {
    this.setState({
      query: value,
    });
  };

  toggleMobileMenu = () => {
    this.setState(state => ({
      menuVisible: !state.menuVisible,
    }));
  };

  render() {
    return (
      <header>
        <div className="logo">
          <Link to="/">Husky Bathrooms</Link>
        </div>
        <div className="logo-mobile">
          <Link to="/">HB</Link>
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
          {this.props.session ? (
            <>
              <Link to="/add" className="action-bar-item">
                Add a Restroom
              </Link>
              <Link to="/profile" className="action-bar-item">
                {this.props.session.name.slice(
                  0,
                  this.props.session.name.indexOf(' ')
                )}
              </Link>
              <Link to="/login" className="action-bar-item">
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="action-bar-item">
              Login
            </Link>
          )}
        </div>
        <div className="action-bar mobile">
          <button type="button" onClick={() => this.toggleMobileMenu()}>
            {this.state.menuVisible ? (
              <Icon icon={closeIcon} />
            ) : (
              <Icon icon={navicon} />
            )}
          </button>
        </div>
        <div
          className={`mobile-menu ${this.state.menuVisible ? 'visible' : ''}`}
        >
          <ul>
            {this.props.session ? (
              <>
                <li>
                  <Link to="/add" onClick={() => this.toggleMobileMenu()}>
                    Add Restroom
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => this.toggleMobileMenu()}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={() => this.toggleMobileMenu()}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => this.toggleMobileMenu()}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.query,
    session: state.session,
  };
};

const wrSiteNav = withRouter(connect(mapStateToProps)(SiteNav));

export { wrSiteNav as SiteNav };
