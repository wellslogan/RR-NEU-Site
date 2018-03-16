import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  SiteNav,
  Home,
  Location,
  RoomDetails,
  AddRoom,
  Loading,
  SearchResults,
  Login,
  Profile,
} from '@app/components';
import { createAndPersistStore } from '@app/_shared/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = createAndPersistStore();

const App = props => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <>
          <Loading />
          <div className="container">
            <SiteNav />
            <Route
              path="/"
              exact
              render={routeProps => <Home {...props} {...routeProps} />}
            />
            <Route path="/room" exact />
            <Route path="/room/:id" component={RoomDetails} />
            <Route
              path="/add"
              exact
              render={routeProps => <AddRoom {...props} {...routeProps} />}
            />
            <Route path="/search" component={SearchResults} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <footer>
              Developed in 2018 by Logan Wells.{' '}
              <a
                href="https://github.com/wellslogan/rr-neu-site"
                target="_blank"
              >
                Source code on Github
              </a>. Favicon courtesy of{' '}
              <a
                href="https://www.emojione.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                EmojiOne
              </a>{' '}
              via{' '}
              <a
                href="https://emojitwo.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                EmojiTwo
              </a>.
            </footer>
          </div>
        </>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
