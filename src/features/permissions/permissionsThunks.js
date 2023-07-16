import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPermissionsAPI,
  getPermissionByIdAPI,
  addPermissionAPI,
  updatePermissionAPI,
  deletePermissionAPI,
} from './permissionsAPI';

export const getPermissions = createAsyncThunk('permissions/getPermissions', async () => {
    const permissions = await getPermissionsAPI();
    return permissions;
  });
  
  export const getPermissionById = createAsyncThunk('permissions/getPermissionById', async (id) => {
    const permission = await getPermissionByIdAPI(id);
    return permission;
  });
  
  export const addPermission = createAsyncThunk('permissions/addPermission', async (permissionData) => {
    await addPermissionAPI(permissionData);
  });
  
  export const updatePermission = createAsyncThunk(
    'permissions/updatePermission',
    async ({ id, permissionData }) => {
      const permission = await updatePermissionAPI(id, permissionData);
      return permission;
    }
  );
  
  export const deletePermission = createAsyncThunk('permissions/deletePermission', async (id) => {
    await deletePermissionAPI(id);
    return id;
  });
  