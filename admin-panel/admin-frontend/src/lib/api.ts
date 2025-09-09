import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data.products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const addProduct = async (productData: any) => {
    try {
        const response = await api.get('/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error; // re-throw to handle in component
    }
};

export const updateProduct = async (id: number, productData: any) => {
    try {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:' error);
        throw error;
    }
};

export const deleteProduct = async (id: number) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

export default api;