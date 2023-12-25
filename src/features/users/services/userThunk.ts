import { createAsyncThunk } from '@reduxjs/toolkit';
import { findTop10SuggestedUsersService } from './userService';
import { AxiosError } from 'axios';

// [GET] /api/v1/users/suggested
export const findTop10SuggestedUsers = createAsyncThunk(
    'findTop10SuggestedUsers',
    async (_, { rejectWithValue }) => {
        try {
            const data = await findTop10SuggestedUsersService();
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
