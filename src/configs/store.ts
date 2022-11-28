import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import searchSlice from '../reducers/searchSlice';
import userSlice from '../reducers/userSlice';

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
