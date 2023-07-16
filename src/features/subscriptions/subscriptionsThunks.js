import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSubscriptionsAPI,
  getSubscriptionByIdAPI,
  addSubscriptionAPI,
  updateSubscriptionAPI,
  deleteSubscriptionAPI,
} from './subscriptionsAPI';

export const getSubscriptions = createAsyncThunk('subscriptions/getSubscriptions', async () => {
  const subscriptions = await getSubscriptionsAPI();
  return subscriptions;
});

export const getSubscriptionById = createAsyncThunk('subscriptions/getSubscriptionById', async (id) => {
  const subscription = await getSubscriptionByIdAPI(id);
  return subscription;
});

export const addSubscription = createAsyncThunk('subscriptions/addSubscription', async (subscriptionData) => {
  await addSubscriptionAPI(subscriptionData);
});

export const updateSubscription = createAsyncThunk(
  'subscriptions/updateSubscription',
  async ({ id, subscriptionData }) => {
    const subscription = await updateSubscriptionAPI(id, subscriptionData);
    return subscription;
  }
);

export const deleteSubscription = createAsyncThunk('subscriptions/deleteSubscription', async (id) => {
  await deleteSubscriptionAPI(id);
  return id;
});
