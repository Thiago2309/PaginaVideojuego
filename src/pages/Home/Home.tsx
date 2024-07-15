import React from 'react';
import '../../App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navegador from '../../layout/Navegador/Navegador';
import HeaderSection from '../../Components/Header/HeaderSection';
import SliderSection from '../../Components/SliderImg/SliderSection';
import NewsSection from '../../Components/Body/NewsSection';
import NewGameSection from '../../Components/Body/NewGameSection';
import Footer from '../../layout/Footer/FooterView'
import NewsView from '../News/NewsView';
// import Api from './layout/ExampleApi/tabla';

// import { Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <div className="App">
      <div>
        <Navegador />
        <HeaderSection />
        <SliderSection />
        <NewsSection />
        <NewGameSection />
        <Footer />
        {/* <NewsView /> */}
        {/* <Api /> */}
      </div>
    </div>
  );
}


export default Home;
