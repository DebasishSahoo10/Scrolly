import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    bookmarks : [],
    newPostField: false,
    editingPost: false,
    editableContent: "",
    editingID : 0
}
export const DataSlice = createSlice({
    name : "data",
    initialState,
    reducers : {
        SET_POSTS : (state, action) => {
            state.posts = action.payload
        },
        POSTFIELD_TRUE : (state, action) => {
            state.newPostField = action.payload
        },
        POSTFIELD_FALSE : (state, action) => {
            state.newPostField = action.payload
        },
        EDIT_TRUE : (state, action) => {
            state.editingPost = action.payload
        },
        EDIT_FALSE : (state, action) => {
            state.editingPost = action.payload
        },
        EDIT_POST : (state, action) => {
            state.editableContent = action.payload
        },
        EDIT_ID : (state, action) => {
            state.editingID = action.payload
        },
        SET_BOOKMARKS : (state, action) => {
            state.bookmarks = action.payload
        }
    }
})
export const SET_POSTS = createAction('data/SET_POSTS', (postArray) => ({
    payload : postArray
}))
export const POSTFIELD_TRUE = createAction('data/POSTFIELD_TRUE', () => ({
    payload : true
}))
export const POSTFIELD_FALSE = createAction('data/POSTFIELD_FALSE', () => ({
    payload : false
}))
export const EDIT_TRUE = createAction('data/EDIT_TRUE', () => ({
    payload : true
}))
export const EDIT_FALSE = createAction('data/EDIT_FALSE', () => ({
    payload : false
}))
export const EDIT_POST = createAction('data/EDIT_POST', (editContent) => ({
    payload : editContent
}))
export const EDIT_ID = createAction('data/EDIT_ID', (editId) => ({
    payload : editId
}))
export const SET_BOOKMARKS = createAction('data/SET_BOOKMARKS', (bookmarkArray) => ({
    payload : bookmarkArray
}))