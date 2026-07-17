import { useState } from 'react';
import { apiClient, setAuthToken } from './index';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/reducers/authReducer';
import { API_ENDPOINTS } from '../constants';

type LoginPayload = Record<string, any>;

export function useLogin() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginMutation = async (payload: LoginPayload) => {
        setIsLoading(true);
        setError(null);
        try {
            // Using the Constant
            const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
            setAuthToken(data.token);
            dispatch(setCredentials({ user: data.user, token: data.token }));
            return data;
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Login failed. Please try again.';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { loginMutation, isLoading, error };
}