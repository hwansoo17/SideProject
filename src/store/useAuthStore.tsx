// src/store/useAuthStore.ts

import { create } from 'zustand';

interface User {
  id: number;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  data: {
    token: string;
    user: User;
  } | null;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  data: null,
  login: (data) => set({ isLoggedIn: true, data }),
  logout: () => set({ isLoggedIn: false, data: null }),
}));

export default useAuthStore;
