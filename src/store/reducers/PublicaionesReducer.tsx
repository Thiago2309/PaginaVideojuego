import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comentario {
  id: number;
  publicacionId: number;
  userId: number;
  texto: string;
  fechaComentario: string;
}

export interface LikeDislike {
  id: number;
  publicacionId: number;
  userId: number;
  like: "L" | "D";
}

export interface Publicacion {
  id: number;
  userId: number;
  usuario: string | null;
  titulo: string;
  descripcion: string;
  imagen: string;
  fechaPublicacion: string;
  comentarios?: Comentario[];
  likesDislikes?: LikeDislike[];
  commentsCount: number;
}

interface PublicacionesState {
  publicaciones: Publicacion[];
  loading: boolean;
  error: string | null;
}

const initialState: PublicacionesState = {
  publicaciones: [],
  loading: false,
  error: null,
};

const publicacionesSlice = createSlice({
  name: 'publicaciones',
  initialState,
  reducers: {
    fetchPublicacionesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPublicacionesSuccess(state, action: PayloadAction<Publicacion[]>) {
      state.publicaciones = action.payload;
      state.loading = false;
    },
    fetchPublicacionesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateComentarios(state, action: PayloadAction<{ id: number; comentarios: Comentario[] }>) {
      const publicacionIndex = state.publicaciones.findIndex((pub) => pub.id === action.payload.id);
      if (publicacionIndex >= 0) {
        state.publicaciones[publicacionIndex].comentarios = action.payload.comentarios;
      }
    },
    updateLikesDislikes(state, action: PayloadAction<{ id: number; likesDislikes: LikeDislike[] }>) {
      const publicacionIndex = state.publicaciones.findIndex((pub) => pub.id === action.payload.id);
      if (publicacionIndex >= 0) {
        state.publicaciones[publicacionIndex].likesDislikes = action.payload.likesDislikes;
      }
    },
  },
});

export const {
  fetchPublicacionesStart,
  fetchPublicacionesSuccess,
  fetchPublicacionesFailure,
  updateComentarios,
  updateLikesDislikes,
} = publicacionesSlice.actions;

export default publicacionesSlice.reducer;
