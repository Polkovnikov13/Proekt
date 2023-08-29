import React from 'react';

export default function UnderUnderCard({ oneUnderUnderCard }) {
  return (
    <tr>
      <td>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
        {oneUnderUnderCard['Наименование Категории/Вид объект']}
      </td>
      <td>
        {oneUnderUnderCard['2_Запланировано']}
      </td>
      <td style={{ color: 'blue' }}>
        {oneUnderUnderCard['2_Построено']}
        {0}
      </td>
      <td>
        {0}
      </td>
      <td style={{ color: 'red' }}>
        {oneUnderUnderCard['2_Строится']}
      </td>
      <td style={{ color: 'blue' }}>
        {0}
      </td>
      <td>
        {0}
      </td>
      <td style={{ color: 'red' }}>
        {0}
      </td>
    </tr>
  );
}
