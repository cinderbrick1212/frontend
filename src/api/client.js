import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Detect environment for base URL
// Android Emulator: 10.0.2.2
// iOS Simulator: localhost
// Physical Device: needs LAN IP (replaceme)
const API_URL = 'https://edu-backend-x2vn.onrender.com/api';

const client = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = async (token) => {
    if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await SecureStore.setItemAsync('userToken', token);
    } else {
        delete client.defaults.headers.common['Authorization'];
        await SecureStore.deleteItemAsync('userToken');
    }
};

// Initialize token from storage on app start
export const loadAuthToken = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    }
    return null;
};

export default client;
