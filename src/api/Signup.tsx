import { useState } from 'react';
import { apiClient } from './index';
import { API_ENDPOINTS } from '../constants';

type SignupPayload = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signupMutation = async (payload: SignupPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      // Using the Constant
      const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, payload);
      return data;
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Signup failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signupMutation, isLoading, error };
}