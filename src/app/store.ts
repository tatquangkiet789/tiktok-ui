import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';
import authReducer from '../features/authSlice';
import searchReducer from '../features/searchSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        auth: authReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
