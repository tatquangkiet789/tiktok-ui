import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: CounterState }
export type AppDispatch = typeof store.dispatch;

export default store;
