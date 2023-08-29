import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import './MyTable.css';
import OneCard from './OneCard';

export default function MyTable() {
  const exampl = useSelector((state) => state.example.array1);
  if (!exampl) {
    // Handle the case when exampl is undefined or null
    return null; // or render a loading state or an error message
  }
  // console.log(exampl);
  const filteredArr = exampl.filter((obj) => !/\./.test(obj['ID Категории/Вид объекта']) && obj['ID Категории/Вид объекта'] !== '0');
  return (
    <Table className="my-down-table">
      <thead>
        <tr>
          <th>
            {(exampl && exampl[0]) ? 'Итого' : ''}
          </th>
          <th>
            {(exampl && exampl[0]) ? exampl[0]['2_Запланировано'] : null}
          </th>
          <th style={{ color: 'blue' }}>
            {(exampl && exampl[0]) ? exampl[0]['2_Построено'] : null}
          </th>
          <th>
            {(exampl && exampl[0]) ? 0 : ''}
          </th>
          <th style={{ color: 'red' }}>
            {(exampl && exampl[0]) ? 0 : ''}
          </th>
          <th style={{ color: 'blue' }}>
            {(exampl && exampl[0]) ? exampl[0]['2_Строится'] : null}
          </th>
          <th>
            {(exampl && exampl[0]) ? 0 : ''}
          </th>
          <th style={{ color: 'red' }}>
            {(exampl && exampl[0]) ? 0 : ''}
          </th>
        </tr>
      </thead>

      <tbody>

        {filteredArr?.map((elem) => (
          <OneCard
            oneCard={elem}
            key={elem['ID Категории/Вид объекта']}
          />
        ))}

      </tbody>
    </Table>
  );
}
