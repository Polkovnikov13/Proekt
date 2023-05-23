import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function MyDate() {
  const [value, setValue] = useState([new Date(), new Date()]);
  const timeDiff = value && Math.abs(value[1] - value[0]);
  const diffDays = value && Math.ceil(timeDiff / (1000 * 3600 * 24));
  console.log(diffDays);

  return (
    <DatePicker
      onChange={setValue}
      value={value}
      selectRange
      className="react-date-picker__wrapper"
    />
  );
}
