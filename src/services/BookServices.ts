import axios from "axios";
import { BookTypes } from "../types/BooksTypes";

const apiUrl = process.env.REACT_APP_BASE_URL as string

export const addBook = async (bookData: BookTypes) => {
    try {
        const response = await axios.post(`${apiUrl}/books`, { bookData });
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error adding book:", error);
    }
};

export const searchBooks = async (title: string) => {
    try {
        const response = await axios.get(`${apiUrl}/books?title=${title}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};

export const editBook = async (id: Number, bookData: BookTypes) => {
    try {
        const response = await axios.put(`${apiUrl}/books/${id}`, { bookData });
        console.log("put", response)
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error editing book:", error);
    }
};