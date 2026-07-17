import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authReducer';
import notesReducer from '../store/reducers/notesReducer';
import Dashboard from '../pages/Dashboard';
import { apiClient } from '../../src/api';

jest.mock('../../src/api');

describe('Dashboard - Create Note', () => {
  it('adds a new note to the list after the create form is submitted', async () => {
    // Preload the store to simulate a logged-in user
    const store = configureStore({
      reducer: { auth: authReducer, notes: notesReducer },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { _id: '1', name: 'Kartik', email: 'kartik@example.com', createdAt: '', updatedAt: '' },
          token: 'fake-token'
        }
      }
    });

    const mockedGet = apiClient.get as jest.Mock;
    const mockedPost = apiClient.post as jest.Mock;

    mockedGet.mockResolvedValueOnce({ data: { notes: [] } });
    mockedPost.mockResolvedValueOnce({
      data: {
        note: {
          _id: 'note-1',
          title: 'Grocery list',
          body: 'Milk, eggs, bread',
          category: 'personal',
          isPinned: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      }
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the empty state to render after the initial fetch
    await screen.findByText(/You don't have any notes yet/i);

    // Fill out the atomic input fields
    await user.type(screen.getByLabelText(/title/i), 'Grocery list');
    await user.type(screen.getByLabelText(/body/i), 'Milk, eggs, bread');
    await user.click(screen.getByRole('button', { name: /add note/i }));

    // Verify the UI updated and the API was called correctly
    expect(await screen.findByText('Grocery list')).toBeInTheDocument();
    expect(mockedPost).toHaveBeenCalledWith('/notes', expect.objectContaining({
      title: 'Grocery list',
      body: 'Milk, eggs, bread'
    }));
  });
});