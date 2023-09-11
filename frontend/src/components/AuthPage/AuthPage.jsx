/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash, FaIconName } from 'react-icons/fa';

import {
  Button, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { loginUser } from '../../redux/actions/userActions';

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  return (
    <Row>
      <Col>
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
            {/* <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div> */}
            <Label for="examplePassword">
              Пароль
            </Label>
          </FormGroup>
          <Button>
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
