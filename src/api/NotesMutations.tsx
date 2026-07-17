import { useState } from 'react';
import { apiClient } from './index';
import { useAppDispatch } from '../store/hooks';
import { addNote, updateNote, removeNote } from '../store/reducers/notesReducer';
import { API_ENDPOINTS } from '../constants';
import type { NoteInput } from '../types';

export function useNotesMutations() {
    const dispatch = useAppDispatch();
    const [isMutating, setIsMutating] = useState(false);

    const createNote = async (payload: NoteInput) => {
        setIsMutating(true);
        try {
            const { data } = await apiClient.post(API_ENDPOINTS.NOTES.BASE, payload);
            dispatch(addNote(data.note)); 
            return data.note;
        } finally {
            setIsMutating(false);
        }
    };

    const editNote = async (id: string, payload: Partial<NoteInput>) => {
        setIsMutating(true);
        try {
            const { data } = await apiClient.put(API_ENDPOINTS.NOTES.BY_ID(id), payload);
            dispatch(updateNote(data.note)); 
            return data.note;
        } finally {
            setIsMutating(false);
        }
    };

    const deleteNote = async (id: string) => {
        setIsMutating(true);
        try {
            await apiClient.delete(API_ENDPOINTS.NOTES.BY_ID(id));
            dispatch(removeNote(id)); 
        } finally {
            setIsMutating(false);
        }
    };

    return { createNote, editNote, deleteNote, isMutating };
}