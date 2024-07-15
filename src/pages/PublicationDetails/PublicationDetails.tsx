import React from "react";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navegador from "../../layout/Navegador/Navegador";
import PublicationComments from "../../Components/GameCommunity/PublicationDetails/PublicationComments";
import Publications from "../../Components/GameCommunity/PublicationDetails/Publication";
import FooterView from "../../layout/Footer/FooterView";

const PublicationDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Recibir el parámetro de la URL

  const handleBackClick = () => {
    navigate("/");
  };

  if (!id) {
    return <Typography variant="h6" color="error">No se proporcionó una publicación válida</Typography>;
  }

  return (
    <div>
      <Navegador />

      <Box sx={{ flexGrow: 1, p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Publications handleBackClick={handleBackClick} publicationId={parseInt(id, 10)} /> {/* Pasar el id */}
          </Grid>
          <Grid item xs={12}>
            <PublicationComments />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
        {FooterView()}
      </Box>
    </div>
  );
};

export default PublicationDetails;
