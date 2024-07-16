import React from "react";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { Comment, ThumbUp, ThumbDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navegador from "../../../../layout/Navegador/Navegador";
import FooterView from "../../../../layout/Footer/FooterView";
import OffertsCrud from "../../../../Components/Admin/Form/Offerts/OffertsCrud";

const OffertsViewCrud: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navegador />
      <Box sx={{ flex: '1', p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 } }}>
        <Grid>
          <Grid item xs={12} md={4}>
            <OffertsCrud />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', mt: '1rem' }}>
        <FooterView />
      </Box>
    </Box>
  );
};

export default OffertsViewCrud;
