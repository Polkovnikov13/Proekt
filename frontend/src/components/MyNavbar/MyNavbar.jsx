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
  Button,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from './MyButton';
import MyDate from './MyDate';
import { logoutUserAsync } from '../../redux/actions/userActions';

export default function MyNavbar({ input, changeHandler, setInput }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <Navbar>
      <div style={{ display: 'flex' }}>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
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
        <NavbarBrand>
          <MyDate />
        </NavbarBrand>
        <NavbarBrand href="/">
          <MyButton input={input} changeHandler={changeHandler} setInput={setInput} />
        </NavbarBrand>
        {user.id && (
        <NavbarBrand>
          <Button color="danger" onClick={() => dispatch(logoutUserAsync())} className="logout-button">Выйти</Button>
        </NavbarBrand>
        )}
        <NavbarBrand href="/">
          {/* <CardImg
            className="avatar-list-container"
            alt="Avatar"
            src="../../../photo/JP_05812.jpg"
          /> */}
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
