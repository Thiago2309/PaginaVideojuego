import React from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navegador from "../../layout/Navegador/Navegador";
import GameOffert from "../../Components/Offerts/GameOff";
// import CommentsOff from "../../Components/Offerts/CommentsOff";
import FooterView from "../../layout/Footer/FooterView";

const GameOfferts: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navegador />
      <Box sx={{ flexGrow: 1, p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GameOffert handleBackClick={handleBackClick} />
          </Grid>
          {/* <Grid item xs={12}>
            <CommentsOff />
          </Grid> */}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
        {FooterView()}
      </Box>
    </div>
  );
};

export default GameOfferts;
