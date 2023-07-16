import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUsersAPI,
  getUserByIdAPI,
  addUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from './usersAPI';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const users = await getUsersAPI();
  return users;
});

export const getUserById = createAsyncThunk('users/getUserById', async (id) => {
  const user = await getUserByIdAPI(id);
  return user;
});

export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  await addUserAPI(userData);
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }) => {
    const user = await updateUserAPI(id, userData);
    return user;
  }
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await deleteUserAPI(id);
  return id;
});
