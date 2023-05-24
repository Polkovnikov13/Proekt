import React from 'react';
import { Button } from 'reactstrap';

export default function BackToMap({ half, setHalf }) {
  const handlerHalf = () => {
    setHalf(!half);
  };
  return (
    <Button onClick={handlerHalf} size="sm" style={{ color: ' rgb(202, 202, 202)', backgroundColor: 'white', border: 'none' }}>⋀</Button>
  );
}
