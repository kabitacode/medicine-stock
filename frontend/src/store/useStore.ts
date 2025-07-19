// store/useStore.ts
import { create } from 'zustand'

export interface User {
  email: string;
  name: string;
  role: string;
  token: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useStore = create<AuthState>((set) => ({
  user: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem('user') || 'null') : null,
  setUser: (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    sessionStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useStore;
