import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDark: false,
      toggleTheme: () => set(s => ({ isDark: !s.isDark })),
    }),
    { name: 'budgethobby-theme' }
  )
);

