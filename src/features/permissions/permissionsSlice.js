import { createSlice } from '@reduxjs/toolkit';
import {
  getPermissions,
  addPermission,
  updatePermission,
  deletePermission,
} from './permissionsThunks';

const initialState = {
    permissions: [],
    status: 'idle',
    error: null,
};
  
const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Fetch all permissions
      builder.addCase(getPermissions.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(getPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      });
      builder.addCase(getPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  
      // Add permission
      builder.addCase(addPermission.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(addPermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions.push(action.payload);
      });
  
      // Update permission
      builder.addCase(updatePermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedPermission = action.payload;
        const existingPermissionIndex = state.permissions.findIndex(
          (permission) => permission.id === updatedPermission.id
        );
        if (existingPermissionIndex !== -1) {
          state.permissions[existingPermissionIndex] = updatedPermission;
        }
      });
  
      // Delete permission
      builder.addCase(deletePermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedPermissionId = action.payload;
        state.permissions = state.permissions.filter((permission) => permission.id !== deletedPermissionId);
      });
    },
  });
  
  export const selectPermissions = (state) => state.permissions.permissions
  
  export default permissionsSlice.reducer;
  