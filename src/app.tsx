import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  SiteNav,
  Homepage,
  Location,
  RoomDetails,
  AddRoom,
  Loading,
  SearchResults,
  Login,
  Profile,
  Footer,
} from '@app/components';
import { createAndPersistStore } from './configureStore';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = createAndPersistStore();

const App = props => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <div className="container">
          <SiteNav />
          <Route
            path="/"
            exact
            render={routeProps => <Homepage {...props} {...routeProps} />}
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
          <Footer />
        </div>
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
