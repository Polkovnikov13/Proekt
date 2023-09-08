import React from 'react';
import { useSelector } from 'react-redux';
import UnderUnderCard from './UnderUnderCard';

export default function OneUnderCard({ underCard, targetMap }) {
  // console.log('underCard', underCard, targetMap);
  const exampl = useSelector((state) => state.example.array1);
  const filteredUnderArr = targetMap.filter((obj) => obj['Наименование Категории'] === underCard && obj['Наименование ПодКатегории'] !== '');
  return (
    filteredUnderArr?.map((elem) => (
      <UnderUnderCard
        oneUnderUnderCard={elem}
        key={elem.id}
      />
    ))
  );
}
