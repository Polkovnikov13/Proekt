/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-calendar/dist/Calendar.css';
import './MyDate.css';

export default function MyDate() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  function onChangeDateHandler(value) {
    setStartDate(value[0]);
    setEndDate(value[1]);
  }

  function onClearHandler() {
    setStartDate(null);
    setEndDate(null);
  }

  const timeDiff = startDate && endDate && (endDate - startDate);
  const diffDays = startDate && endDate && (timeDiff / (1000 * 3600 * 24));
  console.log(diffDays);
  return (
    <div className="rounded-datepicker">
      <DatePicker
        placeholderText="   📅 За всё время"
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeDateHandler}
        dateFormat="dd.MM.yyyy"
        isClearable
        onClear={onClearHandler}
        closeIcon={<span>X</span>}
      />
    </div>
  );
}
