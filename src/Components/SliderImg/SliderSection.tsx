import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; 
import Box from '@mui/material/Box'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

interface Game {
  id: number;
  foto_Url: string;
  nombre: string;
}

const SliderSection = () => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7029/Videojuegos/ObtenerVideojuegos')
      .then((response) => {
        const shuffledGames = response.data.result.sort(() => 0.5 - Math.random());
        const selectedGames = shuffledGames.slice(0, 10);
        setGames(selectedGames);
      })
      .catch((error) => console.error('Error fetching games:', error));
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

  
  const handleGameClick = (gameId: string) => {
    navigate(`/gamedetails/${gameId}`);
  };
  
  return (
    <Box sx={{ padding: "23px" }}>
      <Slider {...settings}>
        {games.map((game) => (
          <Box
            key={game.id}
            onClick={() => handleGameClick(game.id.toString())}
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
              src={game.foto_Url}
              alt={game.nombre}
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
            <p>{game.nombre}</p>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderSection;
