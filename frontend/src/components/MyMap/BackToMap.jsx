import React from 'react';
import { Button } from 'reactstrap';

export default function BackToMap({ half, setHalf }) {
  const handlerHalf = () => {
    setHalf(!half);
  };
  return (
    <Button onClick={handlerHalf} size="sm" style={{ color: 'black', backgroundColor: 'white', border: 'none' }}>ʌ</Button>
  );
}
