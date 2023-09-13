import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button, Col, Container, Row,
} from 'reactstrap';

function ErrorPage() {
  return (
    <Container style={{ marginTop: '90px' }}>
      <Row className="justify-content-center">
        <Col xs="12" md="6">
          <div className="text-center">
            {' '}
            {' '}
            {' '}
            <h1>Такой страницы не существует</h1>
            <NavLink className="nav-link" to="/">
              <Button type="button" className="btn btn-primary">
                Вернуться на стартовую страницу
              </Button>
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorPage;
