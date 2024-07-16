// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import videojuegosReducer from './reducers/videojuegosReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    videojuegos: videojuegosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

