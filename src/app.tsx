import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import { SiteNav } from './components/nav';
import { Home } from './components/home';

const RoomsList: React.StatelessComponent = () => (
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
);

const App = () => (
  <BrowserRouter>
    <>
      <header>
        <SiteNav />
      </header>
      <Container>
        <Route path="/" exact component={Home} />
        <Route path="/rooms" component={RoomsList} />
      </Container>
    </>
  </BrowserRouter>
);

export default App;
