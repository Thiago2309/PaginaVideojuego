import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { VideoGame } from '../../../../Api/Type/IVideoGame'; //interfaz 
import { createVideoGame, updateVideoGame } from '../../../../Api/ApiVideoGame';

interface VideoGameFormProps {
  initialData: VideoGame | null;
  onClose: () => void;
  setVideojuegos: React.Dispatch<React.SetStateAction<VideoGame[]>>;
  videojuegos: VideoGame[];
}

const VideoGameModal: React.FC<VideoGameFormProps> = ({ initialData, onClose, setVideojuegos, videojuegos }) => {
  const [videojuego, setVideojuego] = useState<VideoGame>({
    id: 0,
    nombre: '',
    descripcion: '',
    calificacion: 0,
    foto_url: '',
    genero: '',
    plataforma: '',
    fecha_lanzamiento: '',
    desarrollador: '',
    editor: '',
  });

  useEffect(() => {
    if (initialData) {
      setVideojuego(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideojuego({ ...videojuego, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      const updatedVideojuego = await updateVideoGame(videojuego);
      setVideojuegos(videojuegos.map(v => (v.id === videojuego.id ? updatedVideojuego : v)));
    } else {
      const newVideojuego = { ...videojuego, id: Date.now() };  // This line can be removed if the backend generates the ID
      const createdVideojuego = await createVideoGame(newVideojuego);
      setVideojuegos([...videojuegos, createdVideojuego]);
    }
    onClose();
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
            value={videojuego.foto_url}
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
            name="fecha_lanzamiento"
            value={videojuego.fecha_lanzamiento}
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
    </Box>
  );
};

export default VideoGameModal;
