import axios from 'axios';

const BASE_URL = 'http://localhost:5555/gift';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Simple request logging for development
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use(
    config => {
      console.log(`Request: ${config.method} ${config.url}`);
      return config;
    },
    error => Promise.reject(error)
  );

  api.interceptors.response.use(
    response => {
      console.log(`Response: ${response.status}`);
      return response;
    },
    error => Promise.reject(error)
  );
}

export const getAllGifts = async () => {
  try {
    const response = await api.get('/');
    
    // Handle different response structures
    if (response.data && response.data.data) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching gifts');
    throw error;
  }
};

export const createGift = async (giftData) => {
  try {
    const response = await api.post('/', giftData);
    return response.data;
  } catch (error) {
    console.error('Error creating gift');
    throw error;
  }
};

export const updateGift = async (id, giftData) => {
  try {
    const response = await api.put(`/${id}`, {
      ...giftData,
      price: Number(giftData.price)
    });
    
    // If the backend only returns a message, fetch the updated gift
    if (response.data.message === 'gift updated successfully') {
      const updatedGiftResponse = await api.get(`/${id}`);
      return updatedGiftResponse.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error updating gift');
    throw error;
  }
};

export const deleteGift = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting gift');
    throw error;
  }
};