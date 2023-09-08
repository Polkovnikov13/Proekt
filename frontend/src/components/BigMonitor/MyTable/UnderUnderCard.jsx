import React from 'react';

export default function UnderUnderCard({ oneUnderUnderCard }) {
  return (
    <tr>
      <td>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
        {(oneUnderUnderCard['Наименование ПодКатегории']).slice(0, 27)}
      </td>
      <td>
        {oneUnderUnderCard['1_Всего']}
      </td>
      <td style={{ color: 'blue' }}>
        {oneUnderUnderCard['1_Построено']}
      </td>
      <td>
        {0}
      </td>
      <td style={{ color: 'red' }}>
        {0}
      </td>
      <td style={{ color: 'blue' }}>
        {oneUnderUnderCard['1_Строительство']}
      </td>
      <td>
        {0}
      </td>
      <td>
        {0}
      </td>
    </tr>
  );
}
