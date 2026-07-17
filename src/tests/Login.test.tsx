import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authReducer';
import SignIn from '../../src/pages/SignIn';
import { apiClient } from '../../src/api';

// Mock the centralized Axios instance
jest.mock('../../src/api');

describe('SignIn', () => {
  it('submits the form with the entered email and password', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    const mockedPost = apiClient.post as jest.Mock;

    mockedPost.mockResolvedValueOnce({
      data: {
        token: 'fake-jwt-token',
        user: { _id: '1', name: 'Kartik', email: 'kartik@example.com', createdAt: '', updatedAt: '' },
      }
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByLabelText(/email/i), 'kartik@example.com');
    await user.type(screen.getByLabelText(/password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockedPost).toHaveBeenCalledWith('/auth/login', {
      email: 'kartik@example.com',
      password: 'secret123',
    });
  });
});