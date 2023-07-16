import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMembersAPI,
  getMemberByIdAPI,
  addMemberAPI,
  updateMemberAPI,
  deleteMemberAPI,
} from './membersAPI';

export const getMembers = createAsyncThunk('members/getMembers', async () => {
  const members = await getMembersAPI();
  return members;
});

export const getMemberById = createAsyncThunk('members/getMemberById', async (id) => {
  const member = await getMemberByIdAPI(id);
  return member;
});

export const addMember = createAsyncThunk('members/addMember', async (memberData) => {
  await addMemberAPI(memberData);
});

export const updateMember = createAsyncThunk(
  'members/updateMember',
  async ({ id, memberData }) => {
    const member = await updateMemberAPI(id, memberData);
    return member;
  }
);

export const deleteMember = createAsyncThunk('members/deleteMember', async (id) => {
  await deleteMemberAPI(id);
  return id;
});
