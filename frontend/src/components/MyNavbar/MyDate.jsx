/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-calendar/dist/Calendar.css';

export default function MyDate() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  function onChangeDateHandler(value) {
    // console.log(value);
    setStartDate(value[0]);
    setEndDate(value[1]);
  }

  return (
    <div>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeDateHandler}
        dateFormat="dd.MM.yyyy"
      />
    </div>
  );
}
