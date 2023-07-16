import { createSlice } from '@reduxjs/toolkit';
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from './moviesThunks';

const initialState = {
    movies: [],
    status: 'idle',
    error: null,
};
  
const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Fetch all movies
      builder.addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      });
      builder.addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  
      // Add movie
      builder.addCase(addMovie.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(addMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies.push(action.payload);
      });
  
      // Update movie
      builder.addCase(updateMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedMovie = action.payload;
        const existingMovieIndex = state.movies.findIndex(
          (movie) => movie.id === updatedMovie.id
        );
        if (existingMovieIndex !== -1) {
          state.movies[existingMovieIndex] = updatedMovie;
        }
      });
  
      // Delete movie
      builder.addCase(deleteMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedMovieId = action.payload;
        state.movies = state.movies.filter((movie) => movie.id !== deletedMovieId);
      });
    },
  });
  
  export const selectMovies = (state) => state.movies.movies
  
  export const selectMoviesLoading = (state) =>
  state.movies.status === 'loading'
  
  export default moviesSlice.reducer;
  