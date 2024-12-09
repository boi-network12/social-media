import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from '../Loading/Loading'; // Import Loading Component
import config from "../config";

// create Context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // check if the user is already authenticated on initial load
    useEffect(() => {
        const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        const localToken = localStorage.getItem('token');

        if (localUser && localToken) {
            setUser(localUser);
        }

        setLoading(false);
    }, []);

    // Register user
    const registerUser = async (userData) => {
        setLoading(true);

        try {
            const response = await fetch(`${config.SERVER_URI}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                const { token, user } = data;

                // Save user data and token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setUser(user);
            } else {
                console.error("Error during registration:", data.message);
                alert(`Registration failed: ${data.message || 'Unknown error'}`);
            }

        } catch (error) {
            console.error('Error during registration:', error || error.message || error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            alert('An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (loginData) => {
        setLoading(true);

        try {
            const response = await fetch(`${config.SERVER_URI}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            console.log("Login response data:", data);

            if (response.ok) {
                const { token, user } = data;

                // Save user data and token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setUser(user);

                return true;
            } else {
                console.error('Error during login:', data.message);
                alert(`Login failed: ${data.message || 'Unknown error'}`);
                return false;
            }

        } catch (error) {
            console.error('Error during login:', error || error.message);
            alert('An error occurred during registration. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logoutUser = () => {
        setLoading(true);

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setUser(null);

        setLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                registerUser,
                loginUser,
                logoutUser,
            }}
        >
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

// custom hook to use Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('userAuth must be used within an authprovider');
    }

    return context;
};
