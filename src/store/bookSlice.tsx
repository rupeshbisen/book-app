import { createSlice } from "@reduxjs/toolkit";
import { BookTypes, PaginationTypes } from "../types/BooksTypes";

export interface BookState {
    books: BookTypes[];
    newBook: BookTypes;
    updateBook: BookTypes | null;
    paginationData: PaginationTypes
}
const initialState: BookState = {
    books: [],
    newBook: {
        id: 0,
        author: "",
        country: "",
        language: "",
        link: "",
        pages: "",
        title: "",
        year: ""
    },
    updateBook: null,
    paginationData: {
        sortDirection: "",
        totalPages: 0,
        pageSize: 0,
        currentPage: 0,
        totalElements: 0
    }
}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBooks: (state, actions) => {
            state.books = actions.payload
        },
        setPaginationData: (state, actions) => {
            state.paginationData = actions.payload
        },
    }

});

export const { setBooks, setPaginationData } = bookSlice.actions;

export default bookSlice.reducer