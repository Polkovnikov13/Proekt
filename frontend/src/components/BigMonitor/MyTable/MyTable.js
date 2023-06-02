import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import MySchool from './MySchool';
import './MyTable.css';

export default function MyTable() {
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
    <Table className="my-down-table">
      <thead>
        <tr>
          <th>
            Итого
          </th>
          <th>
            9850
          </th>
          <th style={{ color: 'blue' }}>
            340
          </th>
          <th>
            2450
          </th>
          <th style={{ color: 'red' }}>
            452
          </th>
          <th style={{ color: 'blue' }}>
            2545
          </th>
          <th>
            5672
          </th>
          <th style={{ color: 'red' }}>
            85
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <Button
              onClick={changeHandler}
              color="light"
              size="sm"
            >
              {galochka}
            </Button>
            🎓 Образование
          </th>
          <td>
            150
          </td>
          <td style={{ color: 'blue' }}>
            10
          </td>
          <td>
            50
          </td>
          <td style={{ color: 'red' }}>
            12
          </td>
          <td style={{ color: 'blue' }}>
            85
          </td>
          <td>
            100
          </td>
          <td style={{ color: 'red' }}>
            6
          </td>
        </tr>
        {education === false ? null : (
          <MySchool style={{ }} />
        )}
        <tr>
          <th scope="row">
            <Button
              color="light"
              size="sm"
            >
              {'>'}
            </Button>
            🔬 Здравохранение
          </th>
          <td>
            150
          </td>
          <td style={{ color: 'blue' }}>
            10
          </td>
          <td>
            50
          </td>
          <td style={{ color: 'red' }}>
            12
          </td>
          <td style={{ color: 'blue' }}>
            85
          </td>
          <td>
            100
          </td>
          <td style={{ color: 'red' }}>
            6
          </td>
        </tr>
        <tr>
          <th scope="row">
            <Button
              color="light"
              size="sm"
            >
              {'>'}
            </Button>
            ⚖ Муниципальные учреждения
          </th>
          <td>
            150
          </td>
          <td style={{ color: 'blue' }}>
            10
          </td>
          <td>
            50
          </td>
          <td style={{ color: 'red' }}>
            12
          </td>
          <td style={{ color: 'blue' }}>
            85
          </td>
          <td>
            100
          </td>
          <td style={{ color: 'red' }}>
            6
          </td>
        </tr>
        <tr>
          <th scope="row">
            <Button
              color="light"
              size="sm"
            >
              {'>'}
            </Button>
            🚘 Транспорт и логистика
          </th>
          <td>
            150
          </td>
          <td style={{ color: 'blue' }}>
            10
          </td>
          <td>
            50
          </td>
          <td style={{ color: 'red' }}>
            12
          </td>
          <td style={{ color: 'blue' }}>
            85
          </td>
          <td>
            100
          </td>
          <td style={{ color: 'red' }}>
            6
          </td>
        </tr>
        <tr>
          <th scope="row">
            <Button
              color="light"
              size="sm"
            >
              {'>'}
            </Button>
            🛡 Силовые Структуры
          </th>
          <td>
            150
          </td>
          <td style={{ color: 'blue' }}>
            10
          </td>
          <td>
            50
          </td>
          <td style={{ color: 'red' }}>
            12
          </td>
          <td style={{ color: 'blue' }}>
            85
          </td>
          <td>
            100
          </td>
          <td style={{ color: 'red' }}>
            6
          </td>
        </tr>
        <tr>
          <th scope="row">
            <Button
              color="light"
              size="sm"
            >
              {'>'}
            </Button>
            Жилые помещения
          </th>
          <td>
            150
          </td>
          <td style={{ color: 'blue' }}>
            10
          </td>
          <td>
            50
          </td>
          <td style={{ color: 'red' }}>
            12
          </td>
          <td style={{ color: 'blue' }}>
            85
          </td>
          <td>
            100
          </td>
          <td style={{ color: 'red' }}>
            6
          </td>
        </tr>
        <tr>
          <th scope="row">
            <Button
              color="light"
              size="sm"
            >
              {'>'}
            </Button>
            Образование
          </th>
          <td>
            150
          </td>
          <td style={{ color: 'blue' }}>
            10
          </td>
          <td>
            50
          </td>
          <td style={{ color: 'red' }}>
            12
          </td>
          <td style={{ color: 'blue' }}>
            85
          </td>
          <td>
            100
          </td>
          <td style={{ color: 'red' }}>
            6
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
