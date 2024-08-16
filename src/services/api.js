import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://hm-frontend-testing.azurewebsites.net',
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleError = (error) => {
    console.error('API Error:', error);
    throw error;
};

export default {
    async getCategories() {
        try {
            const response = await apiClient.get('/Structure/categories');
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },
    async getProducts() {
        try {
            const response = await apiClient.get('/Structure/products');
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },
    async getAttributes() {
        try {
            const response = await apiClient.get(`/Structure/attributes`);
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },
};
