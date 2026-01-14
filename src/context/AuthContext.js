import React, { createContext, useState, useEffect } from 'react';
import client, { setAuthToken, loadAuthToken } from '../api/client';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await client.post('/auth/login', { email, password });
            const { token, user } = response.data;
            setUserToken(token);
            setUserInfo(user);
            await setAuthToken(token);
        } catch (error) {
            console.log('Login error', error.response?.data || error.message);
            Alert.alert('Login Failed', error.response?.data?.error || 'Something went wrong');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email, password, role = 'student') => {
        setIsLoading(true);
        try {
            const response = await client.post('/auth/register', { email, password, role });
            const { token, user } = response.data;
            setUserToken(token);
            setUserInfo(user);
            await setAuthToken(token);
        } catch (error) {
            console.log('Register error', error.response?.data || error.message);
            Alert.alert('Registration Failed', error.response?.data?.error || 'Something went wrong');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setUserToken(null);
        setUserInfo(null);
        await setAuthToken(null);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const token = await loadAuthToken();
            if (token) {
                // Optionally verify token with backend /me endpoint
                try {
                    const response = await client.get('/auth/me');
                    setUserToken(token);
                    setUserInfo(response.data.user);
                } catch (e) {
                    // Token invalid
                    logout();
                }
            }
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, register, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
