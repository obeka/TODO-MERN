import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userName: "",
  token: null,
  login: () => {},
  logout: () => {},
});
