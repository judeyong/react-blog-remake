import { createContext } from "react";

export const AppContexts = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  loginEmail: {},
  Email_FUNC: () => {},
  users: [],
  posts: [],
  ADD_USER: () => {},
  ADD_POSTS: () => {},
  UPDATE_POST: () => {},
});
