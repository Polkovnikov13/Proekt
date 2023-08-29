import React, { useState } from 'react';
import { Button } from 'reactstrap';
import OneUnderCard from './OneUnderCard';

export default function OneCard({
  oneCard,
}) {
  // console.log(oneCard);
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

          {oneCard['Наименование Категории/Вид объект']}
        </th>
        <td>
          {oneCard['2_Запланировано']}
        </td>
        <td style={{ color: 'blue' }}>
          {oneCard['2_Построено']}
        </td>
        <td>
          {0}
        </td>
        <td style={{ color: 'red' }}>
          {0}
        </td>
        <td style={{ color: 'blue' }}>
          {oneCard['2_Строится']}
        </td>
        <td>
          {0}
        </td>
        <td style={{ color: 'red' }}>
          {0}
        </td>
      </tr>
      {education === false ? null : <OneUnderCard key={oneCard.id} underCard={oneCard['ID Категории/Вид объекта']} />}
    </>
  );
}
