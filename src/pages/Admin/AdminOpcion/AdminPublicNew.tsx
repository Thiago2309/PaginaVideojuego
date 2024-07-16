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
import Navegador from "../../../layout/Navegador/Navegador";
import FooterView from "../../../layout/Footer/FooterView";
import AdminSelect from "../../../Components/Admin/AdminOpcion/AdminSelect";

const AdminPublicNew: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navegador />
      <Box sx={{ flexGrow: 1, p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 }}}>
        <Grid>
          <Grid item xs={12} md={4}>
            <AdminSelect />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', mt:'1rem' }}>
        {FooterView()}
      </Box>
    </div>
  );
  // <Grid container spacing={2}> para dividirlo en partes
};

export default AdminPublicNew;