import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(false);
  const [userName, setUserName] = useState("");

  const login = useCallback((token, userId, userName) => {
    setToken(token);
    setUserId(userId);
    setUserName(userName);
    localStorage.setItem(
      "todoUserData",
      JSON.stringify({ userId, token, userName })
    );
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("todoUserData");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("todoUserData"));
    if (storedData && storedData.token) {
      login(storedData.token, storedData.userId, storedData.userName);
    }
  }, [login]);

  return { login, logout, token, userId, userName };
};
