import React, { useState, useContext, createContext, useEffect } from "react";
import authService from "../service/auth.service";
import tokenService from "../service/token.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        setUser(userData);
        tokenService.setUser(userData);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        tokenService.removeUser();
    };

    const getUser = () => {
        return tokenService.getUser();
    };

    // Initialize user from localStorage on app start
    useEffect(() => {
        const storedUser = tokenService.getUser();
        if (storedUser && storedUser.accessToken) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const value = {
        user,
        login,
        logout,
        getUser,
        loading,
        isAuthenticated: !!user?.accessToken
    };

    return React.createElement(
        AuthContext.Provider,
        { value: value },
        children
    );
};

export const useAuthContext = () => useContext(AuthContext);