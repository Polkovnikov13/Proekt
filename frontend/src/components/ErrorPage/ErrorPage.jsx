import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

function ErrorPage() {
  return (
    <div>
      <h1>Такой странички не существует</h1>
      <Button component={NavLink} to="/check" variant="filled">
        Вернуться на главную
      </Button>
    </div>
  );
}

export default ErrorPage;