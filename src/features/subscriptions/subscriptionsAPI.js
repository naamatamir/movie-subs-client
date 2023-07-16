import axios from 'axios';

const gatewayURL =`${process.env.REACT_APP_GATEWAY_URL}/subscriptions`;
  // 'http://localhost:8002/subscriptions';

export const getSubscriptionsAPI = async () => {
  try {
    const response = await axios.get(gatewayURL);
    return response.data;
  } catch (error) {
    console.error('Error getting subscriptions:', error);
      throw error;
  }
};

export const getSubscriptionByIdAPI = async (subscriptionId) => {
    try {
      const response = await axios.get(`${gatewayURL}/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting subscription with ID ${subscriptionId}:`, error);
      throw error;
    }
  };

export const addSubscriptionAPI = async (subscriptionData) => {
    try {
      const response = await axios.post(gatewayURL, subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Error adding new subscription:', error);
      throw error;
    }
  };
  
  export const updateSubscriptionAPI = async (subscriptionId, subscriptionData) => {
    try {
      const response = await axios.put(`${gatewayURL}/${subscriptionId}`, subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  };
  
  export const deleteSubscriptionAPI = async (subscriptionId) => {
    try {
      const response = await axios.delete(`${gatewayURL}/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting subscription:', error);
      throw error;
    }
  };