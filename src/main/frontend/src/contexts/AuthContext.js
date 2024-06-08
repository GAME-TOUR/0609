import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); // Add state to store user id

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        axios.get('/api/user', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.name && response.data.name !== "anonymousUser") {
                    setIsLoggedIn(true);
                    setUserId(response.data.id); // Set user id if user is logged in
                } else {
                    setIsLoggedIn(false);
                    setUserId(null); // Clear user id if user is not logged in
                }
            })
            .catch(error => {
                console.error('Login status check failed:', error);
                setIsLoggedIn(false);
                setUserId(null);
            });
    };

    // Function to return user id
    const getUserId = () => {
        return userId;
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, getUserId }}> {/* Include getUserId in context value */}
            {children}
        </AuthContext.Provider>
    );
};
