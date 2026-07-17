import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
// Ensure the import below points to the correct file name (e.g., notesReducer.ts)
import notesReducer from './reducers/notesReducer'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;