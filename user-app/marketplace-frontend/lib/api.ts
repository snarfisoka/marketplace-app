import axios from 'axios';

// Get the backend API URL from an environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    try {
        const response = await api.get('/api/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};