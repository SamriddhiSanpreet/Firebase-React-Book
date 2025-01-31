// booksReducer.js

import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

// Action Types
const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
const ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS";
const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";
const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS"; 

// Action Creators
export const fetchBooks = () => async (dispatch) => {
  const querySnapshot = await getDocs(collection(db, "books"));
  const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
};

export const addBook = (book) => async (dispatch) => {
  const docRef = await addDoc(collection(db, "books"), book);
  dispatch({ type: ADD_BOOK_SUCCESS, payload: { id: docRef.id, ...book } });
};

export const deleteBook = (id) => async (dispatch) => {
  await deleteDoc(doc(db, "books", id));
  dispatch({ type: DELETE_BOOK_SUCCESS, payload: id });
};

export const updateBook = (id, updatedBook) => async (dispatch) => {  
  const bookRef = doc(db, "books", id);
  await updateDoc(bookRef, updatedBook);
  dispatch({ type: UPDATE_BOOK_SUCCESS, payload: { id, updatedBook } });
};

const initialState = {
  books: []
};

// Reducer
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.payload };
    case ADD_BOOK_SUCCESS:
      return { ...state, books: [...state.books, action.payload] };
    case DELETE_BOOK_SUCCESS:
      return { ...state, books: state.books.filter(book => book.id !== action.payload) };
    case UPDATE_BOOK_SUCCESS:  
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? { ...book, ...action.payload.updatedBook } : book
        )
      };
    default:
      return state;
  }
};

export default booksReducer;
