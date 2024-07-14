import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { getOfertaById, getUsuarioById } from "../../services/api";
import Navegador from "../../layout/Navegador/Navegador";
import FooterView from "../../layout/Footer/FooterView";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import IconOferta from "@mui/icons-material/LocalOfferOutlined";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import imagen_default from "../../assets/images/banner_default.jpg";

const GameOffert: React.FC<{ handleBackClick: () => void }> = ({ handleBackClick }) => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<any>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchGame = async () => {
      if (id) {
        const gameData = await getOfertaById(parseInt(id));
        setGame(gameData);
        if (gameData.userId) {
          const userData = await getUsuarioById(gameData.userId);
          setUsername(userData.UsuarioNombre || "Usuario");
        }
      }
    };
    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const fotos = Array.isArray(game.foto_Url) ? game.foto_Url : [game.foto_Url || imagen_default];
  const generos = game.genero.split(",").map((genero: string) => genero.trim());

  return (
    <Card sx={{ backgroundColor: "#1C172B", width: "100%" }}>
      <CardContent sx={{ padding: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              {game.nombre}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#69BE28",
                color: "#ffffff",
                textTransform: "none",
                "& .MuiButton-endIcon": {
                  marginLeft: 1,
                },
              }}
              endIcon={<IconOferta />}
              onClick={() => window.open(game.link, "_blank")}
            >
              Ir a la oferta
            </Button>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, color: "#ffffff", textAlign: "left" }}
        >
          Publicado el {new Date(game.fecha_Lanzamiento).toLocaleDateString("es-ES")} por {username}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            {generos.map((genero: string, index: number) => (
              <Chip
                key={index}
                label={genero}
                sx={{
                  backgroundColor: "#2C2839",
                  color: "#ffffff",
                  borderRadius: 3,
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: 2, borderRadius: 3, overflow: "hidden" }}>
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides
            autoplay={{ delay: 2500, disableOnInteraction: false }}
          >
            {fotos.map((url: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Banner ${index + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: "600px",
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination" style={{ bottom: "10px" }}></div>
          </Swiper>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 2,
            color: "#ffffff",
            textAlign: "left",
            fontSize: "1.2rem",
          }}
        >
          {game.descripcion}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameOffert;
