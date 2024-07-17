// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import videojuegosReducer from './reducers/videojuegosReducer';
import publicacionesReducer from './reducers/PublicaionesReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    videojuegos: videojuegosReducer,
    publicaciones: publicacionesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

