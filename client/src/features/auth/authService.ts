/**
 * Auth service — thin wrappers around the shared axios instance.
 * Components should prefer these over calling `authApi` from api.ts directly
 * so that auth-specific logic stays in one place.
 */

import { api } from '@/services/api';
import type { AuthResponse } from '@/types';

export const authService = {
  /**
   * Register a new user and return the auth response (user + JWT token).
   */
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/register', { email, password });
    return res.data;
  },

  /**
   * Log in with email/password and return the auth response (user + JWT token).
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    return res.data;
  },
};

