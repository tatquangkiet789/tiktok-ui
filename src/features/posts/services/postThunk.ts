import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IFindPost } from '../models/postModel';
import { findAllPostsService } from './postService';

export const findAllPosts = createAsyncThunk(
    'findAllPosts',
    async (
        { page, username }: { page: number; username?: string },
        { rejectWithValue },
    ) => {
        try {
            const data = await findAllPostsService({ page, username });
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);
