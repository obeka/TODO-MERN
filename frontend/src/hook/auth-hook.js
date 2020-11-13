import { useState } from "react";

export const useAuth = () => {
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState(false);

    const login = (token, userId, isLoggedIn) => {
        setToken(token)
        setUserId(userId)
    }
    const logout = () => {
        setToken(null)
        setUserId(null)
    }
    return {token, userId, login, logout}
};
