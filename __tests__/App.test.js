// __tests__/App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import * as taskService from '../taskService';

jest.mock('../taskService');

describe('App', () => {
  beforeEach(() => {
    taskService.fetchTasks.mockClear();
  });

  test('renders App component and fetches tasks', async () => {
    taskService.fetchTasks.mockResolvedValue([{ id: 1, title: 'Test Task', date: '2023-10-01', time: '09:00' }]);

    render(<App />);

    const titleElement = await screen.findByText(/Task Notifier/i);
    expect(titleElement).toBeInTheDocument();

    const taskElement = await screen.findByText(/Test Task/i);
    expect(taskElement).toBeInTheDocument();
  });

  test('handles error when fetching tasks', async () => {
    taskService.fetchTasks.mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    const errorElement = await screen.findByText(/Failed to load tasks. Please try again later./i);
    expect(errorElement).toBeInTheDocument();
  });

  test('adds a task', async () => {
    taskService.fetchTasks.mockResolvedValue([]);
    taskService.addTask.mockResolvedValue();

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'New Task' },
    });

    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => expect(taskService.addTask).toHaveBeenCalled());

    const newTaskElement = await screen.findByText(/New Task/i);
    expect(newTaskElement).toBeInTheDocument();
  });

  test('handles error when adding a task', async () => {
    taskService.addTask.mockRejectedValue(new Error('Failed to add'));

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'New Task' },
    });

    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => expect(screen.getByText(/Failed to add task. Please try again later./i)).toBeInTheDocument());
  });
});
