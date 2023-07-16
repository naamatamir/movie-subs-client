import axios from 'axios';

const gatewayURL = `${process.env.REACT_APP_GATEWAY_URL}/movies`;
  // 'http://localhost:8002/movies';

export const getMoviesAPI = async () => {
    try {
      const response = await axios.get(gatewayURL);
      return response.data;
    } catch (error) {
      console.error('Error getting movies:', error);
        throw error;
    }
};
  
export const getMovieByIdAPI = async (movieId) => {
    try {
      const response = await axios.get(`${gatewayURL}/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting movie with ID ${movieId}:`, error);
      throw error;
    }
  };

export const addMovieAPI = async (movieData) => {
    try {
      const response = await axios.post(gatewayURL, movieData);
      return response.data;
    } catch (error) {
      console.error('Error adding new movie:', error);
      throw error;
    }
  };
  
  export const updateMovieAPI = async (movieId, movieData) => {
    try {
      const response = await axios.patch(`${gatewayURL}/${movieId}`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  };
  
  export const deleteMovieAPI = async (movieId) => {
    try {
      const response = await axios.delete(`${gatewayURL}/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  };