import React, { useState } from 'react';
import './MyNavbar.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  CardImg,
  Button,
} from 'reactstrap';

export default function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar>
      <div style={{ display: 'flex' }}>
        <NavbarToggler onClick={toggle} />
        <NavbarBrand className="text-list-container" href="/">
          Мониторинг Строительства
        </NavbarBrand>
      </div>

      <div style={{ display: 'flex' }}>
        <NavbarBrand>
          <Input
            id="exampleFind"
            name="findDoc"
            placeholder="🔍 Поиск"
            type="text"
          />
        </NavbarBrand>
        <NavbarBrand href="/">
          <Input
            id="exampleDate"
            name="dateDoc"
            placeholder="date placeholder"
            type="date"
          />
        </NavbarBrand>
        <NavbarBrand href="/">
          <Button color="primary">🔬 Фильтры</Button>
        </NavbarBrand>
        <NavbarBrand href="/">
          <CardImg
            className="avatar-list-container"
            alt="Avatar"
            src="https://kvartira.sibir-monitoring.ru/img/user.png"
          />
        </NavbarBrand>
      </div>
      <Collapse isOpen={isOpen} navbar className="justify-content-end">
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/">Выпадает Раз</NavLink>
          </NavItem>
        </Nav>
        <NavLink href="/">Выпадает Два</NavLink>
      </Collapse>
    </Navbar>
  );
}
