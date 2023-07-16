import axios from 'axios';

const gatewayURL = 'http://localhost:8002/authUsers';

export const getUsersAPI = async () => {
  try {
    const response = await axios.get(gatewayURL);
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
      throw error;
  }
};

export const getUserByIdAPI = async (userId) => {
    try {
      const response = await axios.get(`${gatewayURL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting user with ID ${userId}:`, error);
      throw error;
    }
  };

export const addUserAPI = async (userData) => {
    try {
      const response = await axios.post(gatewayURL, userData);
      return response.data;
    } catch (error) {
      console.error('Error adding new user:', error);
      throw error;
    }
  };
  
  export const updateUserAPI = async (userId, userData) => {
    try {
      const response = await axios.patch(`${gatewayURL}/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };
  
  export const deleteUserAPI = async (userId) => {
    try {
      const response = await axios.delete(`${gatewayURL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };