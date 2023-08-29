import React from 'react';
import { useSelector } from 'react-redux';
import UnderUnderCard from './UnderUnderCard';

export default function OneUnderCard({ underCard }) {
  const exampl = useSelector((state) => state.example.array1);
  const filteredUnderArr = exampl.filter((obj) => obj.Parent_ID === underCard);
  return (
    filteredUnderArr?.map((elem) => (
      <UnderUnderCard
        oneUnderUnderCard={elem}
        key={elem.id}
      />
    ))
  );
}
