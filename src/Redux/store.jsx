import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthSlice";
import { DataSlice } from "./DataSlice";
import { UserSlice } from "./UserSlice";


export const store = configureStore({
    reducer : {
        auth : AuthSlice.reducer,
        data : DataSlice.reducer,
        user : UserSlice.reducer
    }
})