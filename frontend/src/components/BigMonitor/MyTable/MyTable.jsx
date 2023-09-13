/* eslint-disable max-len */
import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import './MyTable.css';
import OneCard from './OneCard';

export default function MyTable() {
  // const exampl = useSelector((state) => state.example.array1);
  const exampl = useSelector((state) => state.example.array1);
  const mapiName = useSelector((state) => state.mapSlice);
  if (!exampl) {
    return null; // or render a loading state or an error message
  }
  const targetMap = exampl.filter((oneReg) => {
    if (mapiName && mapiName !== 'Российская Федерация') {
      return oneReg.NAME === mapiName;
    }
    return oneReg.NAME === 'Российская Федерация';
  });
  const filteredArr = targetMap.filter((obj) => obj['ID Подкатегории'] === '' && obj['Наименование Категории'] !== 'Все категории');
  const firstTable = targetMap.filter((obj) => obj['ID Подкатегории'] === '' && obj['Наименование Категории'] === 'Все категории');
  return (
    <Table className="my-down-table">
      <thead>
        <tr>
          <th>
            {firstTable && firstTable[0] ? 'Итого' : ''}
          </th>

          <th>
            { firstTable && firstTable[0] ? firstTable[0]['1_Всего'] : null}
          </th>
          <th style={{ color: 'blue' }}>
            { firstTable && firstTable[0] ? firstTable[0]['1_Построено'] : null}
          </th>
          <th>
            {0}
          </th>
          <th style={{ color: 'red' }}>
            {0}
          </th>
          <th style={{ color: 'blue' }}>
            { firstTable && firstTable[0] ? firstTable[0]['1_Строительство'] : null}
          </th>
          <th>
            {0}
          </th>
          <th style={{ color: 'red' }}>
            {0}
          </th>
        </tr>
      </thead>

      <tbody>

        {filteredArr?.map((elem) => (
          <OneCard
            key={elem['Наименование Категории']}
            oneCard={elem}
            targetMap={targetMap}
          />
        ))}

      </tbody>
    </Table>
  );
}
