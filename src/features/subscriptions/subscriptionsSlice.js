import { createSlice } from '@reduxjs/toolkit';
import {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
} from './subscriptionsThunks';

const initialState = {
  subscriptions: [],
  status: 'idle',
  error: null,
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all subscriptions
    builder.addCase(getSubscriptions.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getSubscriptions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.subscriptions = action.payload;
    });
    builder.addCase(getSubscriptions.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Add subscription
    builder.addCase(addSubscription.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addSubscription.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.subscriptions.push(action.payload);
    });

    // Update subscription
    builder.addCase(updateSubscription.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const updatedSubscription = action.payload;
      const existingSubscriptionIndex = state.subscriptions.findIndex(
        (subscription) => subscription.id === updatedSubscription.id
      );
      if (existingSubscriptionIndex !== -1) {
        state.subscriptions[existingSubscriptionIndex] = updatedSubscription;
      }
    });

    // Delete subscription
    builder.addCase(deleteSubscription.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const deletedSubscriptionId = action.payload;
      state.subscriptions = state.subscriptions.filter((subscription) => subscription.id !== deletedSubscriptionId);
    });
  },
});

export const selectSubscriptions = (state) => state.subscriptions.subscriptions

export const selectSubscriptionsLoading = (state) =>
state.subscriptions.status === 'loading'

export default subscriptionsSlice.reducer;
