import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  login: (token, username) => {
    set({ token, username });
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ token: null, username: null });
    localStorage.clear();
  },
}));
