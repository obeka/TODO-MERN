import { useState } from "react";

export const useAuth = () => {
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState(false);
    const [userName, setUserName] = useState("");

    const login = (token, userId, userName) => {
        setToken(token)
        setUserId(userId)
        setUserName(userName)
    }
    const logout = () => {
        setToken(null)
        setUserId(null)
    }
    return {token, userId, userName, login, logout}
};
