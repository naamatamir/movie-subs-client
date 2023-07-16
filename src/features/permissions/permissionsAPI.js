import axios from 'axios';

const gatewayURL = 'http://localhost:8002/permissions';

export const getPermissionsAPI = async () => {
    try {
      const response = await axios.get(gatewayURL);
      return response.data;
    } catch (error) {
      console.error('Error getting permissions:', error);
        throw error;
    }
  };
  
  export const getPermissionByIdAPI = async (permissionId) => {
      try {
        const response = await axios.get(`${gatewayURL}/${permissionId}`);
        return response.data;
      } catch (error) {
        console.error(`Error getting permission with ID ${permissionId}:`, error);
        throw error;
      }
    };
  
  export const addPermissionAPI = async (permissionData) => {
      try {
        const response = await axios.post(gatewayURL, permissionData);
        return response.data;
      } catch (error) {
        console.error('Error adding new permission:', error);
        throw error;
      }
    };
    
export const updatePermissionAPI = async (permissionId, permissionData) => {
  console.log('Updating permission:', permissionData);
      try {
        const response = await axios.patch(`${gatewayURL}/${permissionId}`, permissionData);
        return response.data;
      } catch (error) {
        console.error('Error updating permission:', error);
        throw error;
      }
    };
    
    export const deletePermissionAPI = async (permissionId) => {
      try {
        const response = await axios.delete(`${gatewayURL}/${permissionId}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting permission:', error);
        throw error;
      }
    };