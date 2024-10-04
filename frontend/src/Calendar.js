import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css'; // Не забудьте импортировать ваши стили

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <div className="calendar-container">
      <h2>Select Date</h2>
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
      />
      <p>Chosen date: {selectedDate.toDateString()}</p>
    </div>
  );
};

export default CustomCalendar;
