import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../features/users/usersSlice';
import permissionsSlice from '../features/permissions/permissionsSlice'
import moviesSlice from '../features/movies/moviesSlice';
import subscriptionSlice from '../features/subscriptions/subscriptionsSlice'
import membersSlice from '../features/members/membersSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    permissions: permissionsSlice,
    movies: moviesSlice,
    subscriptions: subscriptionSlice,
    members: membersSlice,
  },
});

export default store;
