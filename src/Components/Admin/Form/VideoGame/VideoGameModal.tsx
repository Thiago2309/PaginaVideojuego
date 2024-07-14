import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Grid, TextField, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { VideoGame, VideoGameFormProps } from '../../../../Api/IVideoGame';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logoutUser } from '../../store/reducers/userReducer';

const API_URL_POST = 'https://localhost:7029/Videojuegos/RegistroDeVideojuego';
const API_URL_PUT = 'https://localhost:7029/Videojuegos';

const VideoGameModal: React.FC<VideoGameFormProps> = ({ initialData, onClose, setVideojuegos, videojuegos }) => {
  const user = useSelector((state: RootState) => state.user); 
  const dispatch = useDispatch();
  console.log('El usuario Autenticado es : '+ user);
  const initialVideojuego: VideoGame = {
    id: 0,
    nombre: '',
    descripcion: '',
    calificacion: 0,
    foto_Url: '[se quitó una URL no válida]',
    genero: '',
    plataforma: '',
    fecha_Lanzamiento: '',
    desarrollador: '',
    editor: '',
    userId: 0,
  };

  const [videojuego, setVideojuego] = useState<VideoGame>(initialVideojuego);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (initialData) {
      setVideojuego(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideojuego(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleEdit = useCallback(async () => {
    try {
      const response = await axios.put(`${API_URL_PUT}/${videojuego.id}`, videojuego);
      const updatedVideojuego = response.data.result;
      setVideojuegos(videojuegos.map(v => (v.id === videojuego.id ? updatedVideojuego : v)));
      setAlertMessage('¡Videojuego Editado exitosamente!');
      setAlertSeverity('success');
      setAlertOpen(true);
      onClose();
    } catch (error) {
      console.error('Error saving video game:', error);
      setAlertMessage('Error al editar el videojuego');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  }, [videojuego, setVideojuegos, videojuegos, onClose]);

  const handleCreate = useCallback(async () => {
    try {
      // Crear un objeto sin el campo 'id'
      const { id, ...videojuegoSinId } = videojuego;
      console.log(videojuegoSinId);
      const response = await axios.post(API_URL_POST, videojuegoSinId);
      const newVideojuego = response.data.result;
      setVideojuegos([...videojuegos, newVideojuego]);
      setAlertMessage('¡Videojuego Creado exitosamente!');
      setAlertSeverity('success');
      setAlertOpen(true);
      onClose();
    } catch (error) {
      console.error('Error saving video game:', error);
      setAlertMessage('Error al crear el videojuego');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  }, [videojuego, setVideojuegos, videojuegos, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      handleEdit();
    } else {
      handleCreate();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            name="nombre"
            value={videojuego.nombre}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción"
            name="descripcion"
            value={videojuego.descripcion}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Calificación"
            name="calificacion"
            value={videojuego.calificacion}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="URL de la Foto"
            name="foto_url"
            value={videojuego.foto_Url}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Género"
            name="genero"
            value={videojuego.genero}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Plataforma"
            name="plataforma"
            value={videojuego.plataforma}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Fecha de Lanzamiento"
            name="fecha_Lanzamiento"
            value={videojuego.fecha_Lanzamiento}
            onChange={handleChange}
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Desarrollador"
            name="desarrollador"
            value={videojuego.desarrollador}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Editor"
            name="editor"
            value={videojuego.editor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" type="submit">
            {initialData ? 'Guardar Cambios' : 'Crear'}
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VideoGameModal;
