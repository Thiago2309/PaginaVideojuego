import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number | null;
  nombre_Completo: string | null;
  usuarioNombre: string | null;
  correo: string | null;
  contraseña: string | null;
  facebookId: string | null;
  fecha_Registro: string | null;
  fkRol: number | null;
  foto_Perfil: string | null;
  googleId: string | null;
  rol: {
    id: number | null;
    nombre: string | null;
  } | null;
}

interface UserState extends User {}

const initialState: UserState = {
  id: localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : null,
  nombre_Completo: localStorage.getItem('userFullName') || null,
  usuarioNombre: localStorage.getItem('userName') || null,
  correo: null,
  contraseña: null,
  facebookId: null,
  fecha_Registro: null,
  fkRol: localStorage.getItem('userRoleId') ? parseInt(localStorage.getItem('userRoleId')!) : null,
  foto_Perfil: null,
  googleId: null,
  rol: {
    id: localStorage.getItem('userRoleId') ? parseInt(localStorage.getItem('userRoleId')!) : null,
    nombre: localStorage.getItem('userRoleName') || null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<{ id: number; nombre: string; apellido: string; usuarioNombre: string; fkRol: number; rolNombre: string }>) {
      state.id = action.payload.id;
      state.nombre_Completo = `${action.payload.nombre} ${action.payload.apellido}`;
      state.usuarioNombre = action.payload.usuarioNombre;
      state.fkRol = action.payload.fkRol;
      state.rol = {
        id: action.payload.fkRol,
        nombre: action.payload.rolNombre,
      };

      // Guarda los datos en localStorage
      localStorage.setItem('userId', action.payload.id.toString());
      localStorage.setItem('userFullName', `${action.payload.nombre} ${action.payload.apellido}`);
      localStorage.setItem('userName', action.payload.usuarioNombre);
      localStorage.setItem('userRoleId', action.payload.fkRol.toString());
      localStorage.setItem('userRoleName', action.payload.rolNombre);
    },
    logoutUser(state) {
      state.id = null;
      state.nombre_Completo = null;
      state.usuarioNombre = null;
      state.correo = null;
      state.contraseña = null;
      state.facebookId = null;
      state.fecha_Registro = null;
      state.fkRol = null;
      state.foto_Perfil = null;
      state.googleId = null;
      state.rol = {
        id: null,
        nombre: null,
      };

      // Limpia los datos de localStorage al desloguear
      localStorage.removeItem('userId');
      localStorage.removeItem('userFullName');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRoleId');
      localStorage.removeItem('userRoleName');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
