import React from 'react';
import Calendar from './Calendar';

const TaskForm = ({ taskTitle, setTaskTitle, selectedDate, setSelectedDate, taskTime, setTaskTime, onAddTask }) => {
  return (
    <div>
      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <input
        type="time"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
      />
      <button onClick={onAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
