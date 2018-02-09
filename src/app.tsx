import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { SiteNav } from '@app/components/nav';
import { Home } from '@app/components/home';
import { Location } from '@app/components/location';
import { RoomDetails } from '@app/components/roomDetails';
import { AddRoom } from '@app/components/addRoom';
import { appReducer } from '@app/_shared/reducers';
import { Loading } from '@app/components/loading';
import { SearchResults } from '@app/components/searchResults';

const store = createStore(appReducer);

const App = props => (
  <Provider store={store}>
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
        </div>
      </>
    </BrowserRouter>
  </Provider>
);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
