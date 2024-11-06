import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  isLoggedIn: false,
  login: (token, username) => {
    set({ token, username, isLoggedIn: true });
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  },
  logout: () => {
    set({ token: null, username: null, isLoggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  },
}));
