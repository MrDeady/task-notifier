// App.js
import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, deleteTask } from './taskService';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        setError('Failed to load tasks. Please try again later.');
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (taskTitle) {
      try {
        await addTask({ title: taskTitle, date: selectedDate.toISOString().split('T')[0], time: taskTime });
        setTaskTitle('');
        setTaskTime('');
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        setError('Failed to add task. Please try again later.');
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      setError('Failed to delete task. Please try again later.');
    }
  };

  return (
    <div className="app">
      <h1>Task Notifier</h1>
      {error && <p className="error">{error}</p>} {/* Отображение ошибок */}
      <TaskForm 
        taskTitle={taskTitle} 
        setTaskTitle={setTaskTitle} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        taskTime={taskTime} 
        setTaskTime={setTaskTime} 
        onAddTask={handleAddTask}
      />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default App;
