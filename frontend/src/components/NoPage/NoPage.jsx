import React from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default function NoPage() {
  return (

    <div>
      <h1>Такой страницы не существует</h1>
      <NavLink className="nav-link" to="/">
        <Button type="button" className="btn btn-primary">
          Вернуться на стартовую страницу
        </Button>
      </NavLink>
    </div>
  );
}
