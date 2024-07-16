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
import Navegador from "../../layout/Navegador/Navegador";
import Comments from "../../Components/Comments/Comments";
import Games from "../../Components/Comments/Game";
import GameForm from "../../Components/GameCatalog/GameForm";
import GameApprobation from "../../Components/Comments/GameApprobation";
import AdminAddOfferForm from "../../Components/GameCatalog/AdminAddOfferForm";
import FooterView from "../../layout/Footer/FooterView";

const GameDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navegador />

      <Box sx={{ flexGrow: 1, p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 } }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <Games handleBackClick={handleBackClick} />
          </Grid> */}
          <Grid item xs={12} md={8}>
            {/* <Comments /> */}
            <Games handleBackClick={handleBackClick} />
          </Grid>
          <Grid item xs={12} md={4}>
            <GameApprobation />
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <Comments /> */}
            <GameForm />
          </Grid>
          <Grid item xs={12} md={8}>
            <AdminAddOfferForm />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
        {FooterView()}
      </Box>
    </div>
  );
};

export default GameDetails;
