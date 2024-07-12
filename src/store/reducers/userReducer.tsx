// src/store/reducers/userReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
  fullName: string | null;
  userName: string | null;
  roleId: number | null;
}

const initialState: UserState = {
  id: null,
  fullName: null,
  userName: null,
  roleId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<{ id: number; nombre: string; apellido: string; usuarioNombre: string; fkRol: number }>) {
      state.id = action.payload.id;
      state.fullName = `${action.payload.nombre} ${action.payload.apellido}`;
      state.userName = action.payload.usuarioNombre;
      state.roleId = action.payload.fkRol;
    },
    // Puedes agregar más acciones del usuario aquí si es necesario
    logoutUser(state) {
      state.id = null;
      state.fullName = null;
      state.userName = null;
      state.roleId = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
