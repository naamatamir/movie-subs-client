import axios from 'axios';

const gatewayURL =`${process.env.REACT_APP_GATEWAY_URL}/members`;
  // 'http://localhost:8002/members';

export const getMembersAPI = async () => {
  try {
    const response = await axios.get(gatewayURL);
    return response.data;
  } catch (error) {
    console.error('Error getting members:', error);
      throw error;
  }
};

export const getMemberByIdAPI = async (memberId) => {
    try {
      const response = await axios.get(`${gatewayURL}/${memberId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting member with ID ${memberId}:`, error);
      throw error;
    }
  };

export const addMemberAPI = async (memberData) => {
    try {
      const response = await axios.post(gatewayURL, memberData);
      return response.data;
    } catch (error) {
      console.error('Error adding new member:', error);
      throw error;
    }
  };
  
  export const updateMemberAPI = async (memberId, memberData) => {
    try {
      const response = await axios.put(`${gatewayURL}/${memberId}`, memberData);
      return response.data;
    } catch (error) {
      console.error('Error updating member:', error);
      throw error;
    }
  };
  
  export const deleteMemberAPI = async (memberId) => {
    try {
      const response = await axios.delete(`${gatewayURL}/${memberId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting member:', error);
      throw error;
    }
  };