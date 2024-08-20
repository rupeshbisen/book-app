import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bookSlice from './bookSlice';

const rootReducer = combineReducers({
    book: bookSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


