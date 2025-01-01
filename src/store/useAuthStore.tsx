import { create } from 'zustand';

interface User {
  id: number;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  } | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  login: (data: { accessToken: string; refreshToken: string; user: User }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  data: null,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  login: (data) => set({ isLoggedIn: true, data }),
  logout: () => set({ isLoggedIn: false, data: null }),
}));

export default useAuthStore;
