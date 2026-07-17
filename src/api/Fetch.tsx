import { useState, useCallback } from 'react';
import { apiClient } from './index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setNotes } from '../store/reducers/notesReducer';
import { API_ENDPOINTS } from '../constants';

export function useFetchNotes() {
    const dispatch = useAppDispatch();
    const { isLoaded } = useAppSelector((state: any) => state.notes);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotesQuery = useCallback(async (forceRefresh = false) => {
        if (isLoaded && !forceRefresh) return;
        setIsLoading(true);
        setError(null);
        try {
            // Using the Constant
            const { data } = await apiClient.get(API_ENDPOINTS.NOTES.BASE);
            dispatch(setNotes(data.notes));
        } catch (err: any) {
            setError('Failed to load notes. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, isLoaded]);

    return { fetchNotesQuery, isLoading, error };
}