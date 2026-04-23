import { create } from "zustand";
import type { AuthStore } from "../types";

const storedToken = localStorage.getItem("token");
const storedUserName = localStorage.getItem("userName");

export const useAuthStore = create<AuthStore>((set) => ({
  token: storedToken,
  userName: storedUserName,

  login: (token, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);

     set({ token, userName });
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName"); 
        set({ token: null, userName: null });
    },
}));
    