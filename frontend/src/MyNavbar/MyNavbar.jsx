import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

  NavbarText,
} from 'reactstrap';

export default function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (

    <Navbar>
      <NavbarToggler onClick={toggle} />
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <input />
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/">Выпадает Раз</NavLink>
          </NavItem>

        </Nav>
        <NavbarText>Выпадает Два</NavbarText>
      </Collapse>
    </Navbar>

  );
}
