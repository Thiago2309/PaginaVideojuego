// src/store/reducers/videojuegosReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Game {
    id: number;
    nombre: string;
    descripcion: string;
    calificacion: number;
    foto_Url: string;
    genero: string;
    plataforma: string;
    fecha_Lanzamiento: string;
    desarrollador: string;
    editor: string;
    userId: number;
  }
  export interface User {
    id: number;
    nombre_Completo: string;
    usuarioNombre: string;
    correo: string;
    contraseña: string;
    facebookId: string;
    fecha_Registro: string;
    fkRol: number;
    foto_Perfil: string;
    googleId: string;
    rol: {
      id: number;
      nombre: string;
    };
  }
  

export interface VideojuegosState {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: VideojuegosState = {
  games: [],
  loading: false,
  error: null,
};

const videojuegosSlice = createSlice({
  name: 'videojuegos',
  initialState,
  reducers: {
    fetchGamesStart(state) {
      state.loading = true;
    },
    fetchGamesSuccess(state, action: PayloadAction<Game[]>) {
      state.loading = false;
      state.games = action.payload;
    },
    fetchGamesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure } = videojuegosSlice.actions;
export default videojuegosSlice.reducer;
