import React from 'react';

const TaskList = ({ tasks, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} (date: {task.date}, time: {task.time})
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
