import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import IconOferta from "@mui/icons-material/LocalOfferOutlined";
import Battlefield_banner_offert_1 from "../../assets/images/GameOffert/Banner/Battlefield_banner_offert_1.jpg";
import Battlefield_banner_offert_2 from "../../assets/images/GameOffert/Banner/Battlefield_banner_offert_2.jpeg";
import Battlefield_banner_offert_3 from "../../assets/images/GameOffert/Banner/Battlefield_banner_offert_3.png";

const GameOffert: React.FC<{ handleBackClick: () => void }> = ({
  handleBackClick,
}) => {
  return (
    <Card sx={{ backgroundColor: "#1C172B", width: "100%" }}>
      <CardContent sx={{ padding: 4 }}>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E10AAB", color: "#ffffff" }}
            onClick={handleBackClick}
          >
            Volver
          </Button>
        </Grid>
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
            <SwiperSlide>
              <img
                src={Battlefield_banner_offert_1}
                alt="Battlefield Banner 1"
                style={{
                  width: "100%",
                  maxHeight: "600px",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Battlefield_banner_offert_2}
                alt="Battlefield Banner 2"
                style={{
                  width: "100%",
                  maxHeight: "600px",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Battlefield_banner_offert_3}
                alt="Battlefield Banner 3"
                style={{
                  width: "100%",
                  maxHeight: "600px",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
            <div className="swiper-pagination" style={{ bottom: "10px" }}></div>
          </Swiper>
        </Box>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Grid item>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              Battlefield
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
              onClick={handleBackClick}
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
          Publicado el 01 de Enero, 2024 por Admin01
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              label="Oferta Especial"
              sx={{
                backgroundColor: "#2C2839",
                color: "#ffffff",
                borderRadius: 3,
                mr: 1,
              }}
            />
          </Box>
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
          Battlefield es una aclamada serie de videojuegos de disparos en
          primera persona desarrollada por DICE y publicada por Electronic Arts.
          Con un enfoque en batallas multijugador masivas, Battlefield se
          distingue por su énfasis en la cooperación entre jugadores y la
          intensidad de las batallas en entornos destructibles. En Battlefield,
          los jugadores se sumergen en escenarios de guerra moderna o histórica,
          desde las trincheras de la Primera Guerra Mundial hasta los campos de
          batalla futuristas. La serie se destaca por su enfoque en vehículos
          militares, mapas expansivos y la capacidad de alterar el terreno y los
          edificios mediante el uso de armamento pesado.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameOffert;
