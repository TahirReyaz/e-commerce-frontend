import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  login: (token, username) => {
    set({ token, username });
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  },
  logout: () => {
    set({ token: null, username: null });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  },
}));
