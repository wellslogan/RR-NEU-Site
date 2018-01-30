import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import { geolocated } from 'react-geolocated';

import { SiteNav } from '@app/components/nav';
import { Home } from '@app/components/home';
import { Location } from '@app/components/location';
import { RoomDetails } from '@app/components/roomDetails';

const App = props => (
  <BrowserRouter>
    <>
      <header>
        <SiteNav />
      </header>
      <Container>
        <Row>
          <Col sm="12">
            <Location {...props} className="center-text" />
          </Col>
        </Row>
        <Route
          path="/"
          exact
          render={routeProps => <Home {...props} {...routeProps} />}
        />
        <Route path="/rooms/:id" component={RoomDetails} />
      </Container>
    </>
  </BrowserRouter>
);

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
