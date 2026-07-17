import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { ToastProvider } from './components/Toast';
import './styles/globals.scss';
import './styles/components.scss';

const savedTheme = window.localStorage.getItem('notes-theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
