/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash, FaIconName } from 'react-icons/fa';
import './AuthPage.css';

import {
  Button, Col, Container, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { loginUser } from '../../redux/actions/userActions';

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  return (
    <Container style={{ marginTop: '90px' }}>

      <Form onSubmit={(e) => dispatch(loginUser(e, Object.fromEntries(new FormData(e.target))))}>
        <FormGroup floating>
          <Input
            id="exampleEmail"
            name="login"
            placeholder="Email"
            type="text"
          />
          <Label for="exampleEmail">
            Логин
          </Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Пароль..."
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
          />
          <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          <Label for="examplePassword">
            Пароль
          </Label>
        </FormGroup>
        <FormGroup floating>
          <Button style={{ marginTop: '20px' }}>
            Login
          </Button>
        </FormGroup>
      </Form>

    </Container>
  );
}
