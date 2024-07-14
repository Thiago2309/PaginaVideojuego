// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Puedes añadir más reductores aquí si es necesario
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
