import * as React from 'react';
import {
  Navbar,
  NavLink,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export const SiteNav: React.StatelessComponent = () => (
  <Navbar color="faded" light expand="md">
    <NavbarBrand href="/">Restroom Review</NavbarBrand>
    <Collapse isOpen={true} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </NavItem>
        {/* <NavItem>
          <Link className="nav-link" to="/rooms">
            Rooms
          </Link>
        </NavItem> */}
      </Nav>
    </Collapse>
  </Navbar>
);
