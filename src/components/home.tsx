import * as React from 'react';
import { Row, Col } from 'reactstrap';

const Home: React.StatelessComponent = () => (
  <Row>
    <Col sm="12" md={{ size: 8, offset: 2 }}>
      <h1>Hello</h1>
    </Col>
  </Row>
);

export { Home };
