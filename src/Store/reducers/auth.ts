import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";

const slice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        logIn: (state, { payload: { token } }) => {
            state.token = token;
        },
        logOut: (state) => {
            state.token = null;
        },
    }
});

const refreshSlice = createSlice({
    name: "authRefresh",
    initialState: { promise: null },
    reducers: {
        refreshingToken: (state, { payload: { promise } }) => {
            state.promise = promise;
        },
        doneRefreshToken: (state) => {
            state.promise = null;
        },
    }
})

export const { logIn, logOut } = slice.actions;
export const { refreshingToken, doneRefreshToken } = refreshSlice.actions;

export const authReducers = slice.reducer;
export const authRefreshReducers = refreshSlice.reducer;

export const selectAuth = () => {
    return (state: {
        auth: { isSignIn: boolean }
    }) => state.auth;
}
