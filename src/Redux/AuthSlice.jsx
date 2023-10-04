import { createAction, createSlice } from "@reduxjs/toolkit"


const initialState = {auth : ""}
export const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        SET_LOGIN : (state, action) => {
            state.auth = action.payload
        },
        SET_LOGOUT : (state, action) => {
            state.auth = action.payload
        }
    }
})
export const SET_LOGIN = createAction('auth/SET_LOGIN', (token) => ({
    payload : token
}))
export const SET_LOGOUT = createAction('auth/SET_LOGOUT', () => ({
    payload : ""
}))