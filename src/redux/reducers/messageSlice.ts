// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { AxiosError } from 'axios';
// import {
//     ICreateNewMessageDTO,
//     IMessageDTO,
// } from 'layouts/HeaderOnlyLayout/pages/MessagePage/models/messageDTO';
// import {
//     createNewMessageService,
//     findAllMessagesByUserIdService,
// } from 'layouts/HeaderOnlyLayout/pages/MessagePage/services/messageService';
// import { IMessage } from 'models/message';
// import { toast } from 'react-toastify';

// interface IMessageState {
//     messageList: IMessage[];
//     loading: boolean;
//     error: string;
// }

// const initialState: IMessageState = {
//     messageList: [],
//     loading: false,
//     error: '',
// };

// // [GET] /api/v1/messages/:userId
// export const findAllMessagesByUserId = createAsyncThunk(
//     'findAllMessagesByUserId',
//     async (params: IMessageDTO, { rejectWithValue }) => {
//         try {
//             const data = await findAllMessagesByUserIdService(params);
//             return data;
//         } catch (error) {
//             const err = error as AxiosError;
//             if (!err.response) throw err;
//             return rejectWithValue(err.response.data);
//         }
//     },
// );

// // [POST] /api/v1/messages/create
// export const createNewMessage = createAsyncThunk(
//     'createNewMessage',
//     async (params: ICreateNewMessageDTO, { rejectWithValue }) => {
//         try {
//             const data = await createNewMessageService(params);
//             return data;
//         } catch (error) {
//             const err = error as AxiosError;
//             if (!err.response) throw err;
//             return rejectWithValue(err.response.data);
//         }
//     },
// );

// const messageSlice = createSlice({
//     name: 'messages',
//     initialState,
//     reducers: {
//         receiveNewMessageFromSocket: (state, action) => {
//             state.messageList.push(action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(findAllMessagesByUserId.pending, (state) => {
//                 state.loading = true;
//                 state.messageList = [];
//                 state.error = '';
//             })
//             .addCase(findAllMessagesByUserId.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.messageList = action.payload.content;
//             })
//             .addCase(findAllMessagesByUserId.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = (action.payload as AxiosError)
//                     ? (action.payload as AxiosError).message
//                     : action.error.message!;
//                 toast.error(state.error);
//             })
//             .addCase(createNewMessage.pending, (state) => {
//                 state.loading = true;
//                 state.error = '';
//             })
//             .addCase(createNewMessage.fulfilled, (state, action) => {
//                 state.loading = false;

//                 // state.messageList.push(action.payload.content);
//                 console.log(action.payload.content);
//             })
//             .addCase(createNewMessage.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = (action.payload as AxiosError)
//                     ? (action.payload as AxiosError).message
//                     : action.error.message!;
//                 toast.error(state.error);
//             });
//     },
// });

// export const { receiveNewMessageFromSocket } = messageSlice.actions;

// export default messageSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
const commentSlice = createSlice({
    name: 'comments',
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {},
});
export default commentSlice.reducer;
