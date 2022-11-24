import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import searchSlice from '../slices/searchSlice';
import userSlice from '../slices/userSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        users: userSlice,
        search: searchSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
