import React, { useState } from 'react';
import { Button } from 'reactstrap';
import OneUnderCard from './OneUnderCard';

export default function OneCard({
  oneCard, targetMap,
}) {
  const [education, setEducation] = useState(false);
  const [galochka, setGalochka] = useState('>');
  const changeHandler = (e) => {
    e.preventDefault();
    if (education === true) {
      setGalochka('>');
    } else if (education === false) {
      setGalochka('∨');
    }
    setEducation(!education);
  };
  return (
    <>
      <tr>
        <th scope="row">
          <Button
            onClick={changeHandler}
            color="light"
            size="sm"
          >
            {galochka}
          </Button>

          {oneCard['Наименование Категории']}
        </th>
        <td>
          {oneCard['1_Всего']}
        </td>
        <td style={{ color: 'blue' }}>
          {oneCard['1_Построено']}
        </td>
        <td>
          {0}
        </td>
        <td style={{ color: 'red' }}>
          {0}
        </td>
        <td style={{ color: 'blue' }}>
          {oneCard['1_Строительство']}
        </td>
        <td>
          {0}
        </td>
        <td style={{ color: 'red' }}>
          {0}
        </td>
      </tr>
      {education === false ? null : <OneUnderCard key={oneCard['ID Подкатегории']} underCard={oneCard['Наименование Категории']} targetMap={targetMap} />}
    </>
  );
}
