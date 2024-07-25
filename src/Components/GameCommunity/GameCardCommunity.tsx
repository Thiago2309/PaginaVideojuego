import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Avatar,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Publicacion } from "../../store/reducers/PublicaionesReducer";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const defaultUserIcon = "path/to/default/user/icon.png";

const GameCard: React.FC<{ publicacion: Publicacion }> = ({ publicacion }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`https://localhost:7029/Usuarios/${publicacion.userId}`);
        const usuarioNombre = response.data.result.usuarioNombre;
        setUserName(usuarioNombre);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, [publicacion.userId]);

  const publicationDate = parseISO(publicacion.fechaPublicacion);
  const formattedDate = format(publicationDate, 'dd/MM/yyyy', { locale: es });
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoaded(true);
    setImageAspectRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight);
  };

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Card
        sx={{
          maxWidth: "100%",
          width: "100%",
          backgroundColor: "#1C172B",
          boxShadow: "none",
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardActionArea
          sx={{ position: "relative", zIndex: 1 }}
        >
          <CardContent
            sx={{
              backgroundColor: "transparent",
              pr: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
              pl: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
              pt: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
              pb: 0, // Remove bottom padding
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar
                src={defaultUserIcon}
                alt="User Icon"
                sx={{ width: 30, height: 30, mr: 1 }}
              />
              <Typography variant="body2" sx={{ color: "#fff", fontSize: 14 }}>
                Publicado por {userName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff", fontSize: 14, ml: 'auto' }}>
                Fecha de publicacion {formattedDate}
              </Typography>
            </Box>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 36,
                textAlign: "left",
                marginBottom: 1,
              }}
            >
              {publicacion.titulo}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                textAlign: "left",
                marginBottom: 2,
                fontSize: 18,
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: publicacion.descripcion }}
            />
            {publicacion.imagen && (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, sm: 400, md: 540 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={publicacion.imagen}
                  alt={publicacion.titulo}
                  onLoad={handleImageLoad}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>
            )} 
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            backgroundColor: "transparent",
            pr: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
            pl: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
            pb: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
            pt: { xs: 2, sm: 3, md: 3, lg: 3, xl: 3 },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default React.memo(GameCard);
