import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // бросаем ошибку, чтобы её можно было обработать в App.js
  }
};

export const addTask = async (task) => {
  try {
    await axios.post(API_URL, task);
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
