import { create } from 'zustand';
import { persist } from 'zustand/middleware';


type Store = {
  token: string | null,
  profile: IUsuario | null,
}

type Actions = {
  setToken: (jwt: string) => void,
  setProfile: (userData: IUsuario) => void,
  logout: () => void,
}

export const useAuthStore = create<Store & Actions>()(
  persist((set) => ({
    token: null,
    profile: null,
    setToken: (jwt) => set(() => ({  token: jwt })),
    setProfile: (userData) => set(() => ({ profile: userData })),
    logout: () => set(() => ({ token: null, profile: null })),
  }),
  { name: 'auth-storage' }
  ),
);

