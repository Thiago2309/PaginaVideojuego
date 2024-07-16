import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Game {
  background_image: string;
  name: string;
}

interface Image {
  src: string;
  alt: string;
}

const SliderSection = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const apiKey = "f440cc6f53ef461793a6427f1abc6020";
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${apiKey}`
        );
        const fetchedImages = response.data.results.map((game: Game) => ({
          src: game.background_image,
          alt: game.name,
        }));
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };

    fetchGames();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: "23px" }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "left" }}>
        Más Populares
      </Typography>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              padding: "0 8px",
              margin: "0 8px",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.5s ease-in-out",
              },
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderSection;
