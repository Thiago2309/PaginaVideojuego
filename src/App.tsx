// import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Button, Typography, Box } from '@mui/material';
// import Alert from '@mui/material/Alert';
import Navegador from '../src/layout/Navegador/Navegador';
import HeaderSection from './layout/Header/HeaderSection';
import SliderSection from './layout/SliderImg/SliderSection';
import NewsSection from './layout/Body/NewsSection';
import NewGameSection from './layout/Body/NewGameSection';

// import { Box } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <div>
        <Navegador />
        <HeaderSection />
        <SliderSection />
        <NewsSection />
        <NewGameSection />
      </div>
    </div>
  );
}


export default App;
