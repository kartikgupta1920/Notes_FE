import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Note } from '../../types';

interface NotesState {
  items: Note[];
  isLoaded: boolean;
}

const initialState: NotesState = {
  items: [],
  isLoaded: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.items.unshift(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.items.findIndex(n => n._id === action.payload._id);
      if (index !== -1) state.items[index] = action.payload;
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(n => n._id !== action.payload);
    },
  },
});

export const { setNotes, addNote, updateNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;