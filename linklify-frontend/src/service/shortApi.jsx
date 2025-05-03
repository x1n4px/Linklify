import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getURL = async (path) => {
    try {
        const response = await axios.get(`${API_URL}/url/${path}`);
        return response.data.original_url;
    } catch (error) {
        console.error('Error fetching bolides:', error);
        throw error;
    }
};

export const postURL = async (url) => {
    try {
        const response = await axios.post(`${API_URL}/url`, { original_url:url });
        return response.data.short_code;
    } catch (error) {
        console.error('Error posting bolides:', error);
        throw error;
    }
}

