import { createSlice } from '@reduxjs/toolkit';
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from './membersThunks';

const initialState = {
  members: [],
  status: 'idle',
  error: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all members
    builder.addCase(getMembers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getMembers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.members = action.payload;
    });
    builder.addCase(getMembers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Add member
    builder.addCase(addMember.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.members.push(action.payload);
    });

    // Update member
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const updatedMember = action.payload;
      const existingMemberIndex = state.members.findIndex(
        (member) => member.id === updatedMember.id
      );
      if (existingMemberIndex !== -1) {
        state.members[existingMemberIndex] = updatedMember;
      }
    });

    // Delete member
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const deletedMemberId = action.payload;
      state.members = state.members.filter((member) => member.id !== deletedMemberId);
    });
  },
});

export const selectMembers = (state) => state.members.members

export const selectMembersLoading = (state) =>
state.members.status === 'loading'

export default membersSlice.reducer;
