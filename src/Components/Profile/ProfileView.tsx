import React from 'react';
import { Card, CardContent, Grid, Typography, Box, Button, Avatar, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FIFA22Image from '../../assets/images/juego1.png'; // Actualiza las rutas de las imágenes
import GTAImage from '../../assets/images/juego2.png'; // Actualiza las rutas de las imágenes

const ProfileHeader = styled(Card)(({ theme }) => ({
  backgroundColor: '#1C172B',
  color: '#ffffff',
  padding: theme.spacing(2),
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const PostCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#2C2839',
  color: '#ffffff',
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
}));

const ProfileView: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: '#121212' }}>
      <ProfileHeader>
        <Avatar
          sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }}
          src="https://via.placeholder.com/100" // Sustituir con la ruta de la imagen del usuario
        />
        <Typography variant="h5" gutterBottom>SalchicaP23</Typography>
        <Typography variant="body1" gutterBottom>@SalchicaP23</Typography>
        <Typography variant="body2" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan odio id lectus auctor.
        </Typography>
        <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#E10AAB' }}>Seguir</Button>
        <Divider sx={{ backgroundColor: '#ffffff', marginY: 2 }} />
        <Grid container justifyContent="space-around">
          <Grid item>
            <Typography variant="h6">100</Typography>
            <Typography variant="body2">Seguidos</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">200</Typography>
            <Typography variant="body2">Seguidores</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">3</Typography>
            <Typography variant="body2">Publicaciones</Typography>
          </Grid>
        </Grid>
      </ProfileHeader>
      <Typography variant="h5" gutterBottom>Publicaciones</Typography>
      <PostCard>
        <Grid container spacing={2}>
          <Grid item>
            <img src={FIFA22Image} alt="FIFA 22" style={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item xs={12} sm container direction="column">
            <Typography variant="h6">FIFA 22</Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan odio id lectus auctor.
            </Typography>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <ThumbUpIcon sx={{ color: '#ffffff' }} />
              </Grid>
              <Grid item>
                <Typography variant="body2">5.3K</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PostCard>
      <PostCard>
        <Grid container spacing={2}>
          <Grid item>
            <img src={GTAImage} alt="GTA V" style={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item xs={12} sm container direction="column">
            <Typography variant="h6">Grand Theft Auto V</Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan odio id lectus auctor.
            </Typography>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <ThumbUpIcon sx={{ color: '#ffffff' }} />
              </Grid>
              <Grid item>
                <Typography variant="body2">5.5K</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PostCard>
    </Box>
  );
};

export default ProfileView;
