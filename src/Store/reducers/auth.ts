import { authApi, logOutApi } from "@/Services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { RootState } from "..";

export interface AuthState {
    token: string | null;
    refreshToken: string | null;
}

export interface AuthRefreshState {
    promise: Promise<AuthState> | null;
}

const authInitialState = { token: null, refreshToken: null } as AuthState;

const slice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        logIn: (state, { payload: { token, refreshToken} }) => {
            state.token = token;
            state.refreshToken = refreshToken;
        },
        logOut: (state) => {
            state.token = null;
            state.refreshToken = null;
        },
    },
});

const authRefreshInitialState = { promise: null } as AuthRefreshState;

const refreshSlice = createSlice({
    name: "authRefresh",
    initialState: authRefreshInitialState,
    reducers: {
        refreshingToken: (state, { payload: { promise } }) => {
            state.promise = promise;
        },
        doneRefreshToken: (state) => {
            state.promise = null;
        },
    }
});

export const { logIn, logOut } = slice.actions;
export const { refreshingToken, doneRefreshToken } = refreshSlice.actions;

export const authReducers = slice.reducer;
export const authRefreshReducers = refreshSlice.reducer;

export const selectAuth = () => {
    return (state: RootState) => state.auth;
}
