import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Grid, TextField, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { VideoGame, VideoGameFormProps } from '../../../../Api/IVideoGame';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const API_URL_POST = 'https://localhost:7029/Videojuegos/RegistroDeVideojuego';
const API_URL_PUT = 'https://localhost:7029/Videojuegos';

const VideoGameModal: React.FC<VideoGameFormProps> = ({ initialData, onClose, setVideojuegos, videojuegos }) => {
  const user = useSelector((state: RootState) => state.user);
  const initialVideojuego: VideoGame = {
    id: 0,
    nombre: '',
    descripcion: '',
    calificacion: 0,
    foto_Url: '',
    genero: '',
    plataforma: '',
    fecha_Lanzamiento: '',
    desarrollador: '',
    editor: '',
    userId: user.id ?? 0,
  };

  const [videojuego, setVideojuego] = useState<VideoGame>(initialVideojuego);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (initialData) {
      setVideojuego({ ...initialData, userId: user.id ?? 0 });
    }
  }, [initialData, user.id]);

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
      setTimeout(onClose, 1200); // Cierra el modal después de 2 segundos
    } catch (error) {
      console.error('Error saving video game:', error);
      setAlertMessage('Error al editar el videojuego');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  }, [videojuego, setVideojuegos, videojuegos, onClose]);

  const handleCreate = useCallback(async () => {
    try {
      const { id, ...videojuegoSinId } = videojuego;
      const response = await axios.post(API_URL_POST, videojuegoSinId);
      const newVideojuego = response.data.result;
      setVideojuegos([...videojuegos, newVideojuego]);
      setAlertMessage('¡Videojuego Creado exitosamente!');
      setAlertSeverity('success');
      setAlertOpen(true);
      setTimeout(onClose, 1200); // Cierra el modal después de 2 segundos
    } catch (error) {
      console.error('Error saving video game:', error);
      setAlertMessage('Error al crear el videojuego');
      setAlertSeverity('error');
      setAlertOpen(true);
      setTimeout(onClose, 1200); // Cierra el modal después de 2 segundos
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
            required
            sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
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
            required
            sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
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
            name="foto_Url"
            value={videojuego.foto_Url}
            onChange={handleChange}
            fullWidth
            required
            sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Género"
            name="genero"
            value={videojuego.genero}
            onChange={handleChange}
            fullWidth
            required
            sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Plataforma"
            name="plataforma"
            value={videojuego.plataforma}
            onChange={handleChange}
            fullWidth
            required
            sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
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
            required
            sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Editor"
            name="editor"
            value={videojuego.editor}
            onChange={handleChange}
            fullWidth
            required 
            sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
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
