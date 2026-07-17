export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteCategory = 'personal' | 'work' | 'other';

export interface Note {
  _id: string;
  title: string;
  body: string;
  category: NoteCategory;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteInput {
  title: string;
  body: string;
  category: NoteCategory;
  isPinned: boolean;
}
