import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authReducer';
import PrivateRoute from '../../src/components/PrivateRoute';

function LoginStub() { return <div>Login Page</div>; }
function NotesStub() { return <div>Notes Dashboard</div>; }

describe('PrivateRoute', () => {
  it('redirects an unauthenticated user from /notes to /login', () => {
    // A fresh Redux store defaults to isAuthenticated: false
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/notes']}>
          <Routes>
            <Route path="/login" element={<LoginStub />} />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <NotesStub />
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Notes Dashboard')).not.toBeInTheDocument();
  });
});