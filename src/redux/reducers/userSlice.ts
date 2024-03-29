import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import { publicAxios } from 'libs/axiosClient';
import { IUser } from 'models/user';

interface IUserState {
    loading: boolean;
    users: IUser[];
    error: string;
    searchResult: IUser[];
}

const initialState: IUserState = {
    loading: true,
    users: [],
    error: '',
    searchResult: [],
};

// [GET] /api/v1/users/suggested
export const findTop10SuggestedUsers = createAsyncThunk(
    'findTop10SuggestedUsers',
    async (): Promise<IUser[]> => {
        const { data } = await publicAxios.get(ENDPOINTS.findTop10SuggestedUsers);
        return data.content;
    },
);

// [GET] /api/v1/search?q=:keyword
export const findAllUsersByKeyword = createAsyncThunk(
    'findAllUsersByKeyword',
    async (keyword: string): Promise<IUser[]> => {
        const { data } = await publicAxios.get(ENDPOINTS.searchUsersByKeyword(keyword));
        return data.content;
    },
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Find 10 Suggested Users
            .addCase(findTop10SuggestedUsers.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(findTop10SuggestedUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(findTop10SuggestedUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            })
            // Find Users By Keyword
            .addCase(findAllUsersByKeyword.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllUsersByKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResult = action.payload;
            })
            .addCase(findAllUsersByKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            });
    },
});

export default userSlice.reducer;
