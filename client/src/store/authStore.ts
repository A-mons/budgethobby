import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setOnboardingComplete: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
        }),
      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
    }),
    { name: 'budgethobby-auth' }
  )
);
