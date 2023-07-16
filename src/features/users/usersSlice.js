import { createSlice } from '@reduxjs/toolkit';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from './usersThunks';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all users
    builder.addCase(getUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Add user
    builder.addCase(addUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users.push(action.payload);
    });

    // Update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const updatedUser = action.payload;
      const existingUserIndex = state.users.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (existingUserIndex !== -1) {
        state.users[existingUserIndex] = updatedUser;
      }
    });

    // Delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const deletedUserId = action.payload;
      state.users = state.users.filter((user) => user.id !== deletedUserId);
    });
  },
});

export const selectUsers = (state) => state.users.users;

export const selectUsersLoading = (state) => state.users.status === 'loading';

export default usersSlice.reducer;
