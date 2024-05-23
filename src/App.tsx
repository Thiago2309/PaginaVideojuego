// import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Button, Typography, Box } from '@mui/material';
// import Alert from '@mui/material/Alert';
import Navegador from '../src/layout/Navegador/Navegador';
import HeaderSection from './layout/Header/HeaderSection';

const App = () => {
  return (
    <div className="App">
      <div>
        <Navegador />
        <HeaderSection />
      </div>
    </div>
  );
}

export default App;
