import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMoviesAPI,
  getMovieByIdAPI,
  addMovieAPI,
  updateMovieAPI,
  deleteMovieAPI,
} from './moviesAPI';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
    const movies = await getMoviesAPI();
    return movies;
  });
  
  export const getMovieById = createAsyncThunk('movies/getMovieById', async (id) => {
    const movie = await getMovieByIdAPI(id);
    return movie;
  });
  
  export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
    await addMovieAPI(movieData);
  });
  
  export const updateMovie = createAsyncThunk(
    'movies/updateMovie',
    async ({ id, movieData }) => {
      const movie = await updateMovieAPI(id, movieData);
      return movie;
    }
  );
  
  export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
    await deleteMovieAPI(id);
    return id;
  });
  