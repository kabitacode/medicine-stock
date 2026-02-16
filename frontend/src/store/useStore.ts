// store/useStore.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface User {
  email?: string;
  name?: string;
  role?: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useStore;
