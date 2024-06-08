import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navegador from '../src/layout/Navegador/Navegador';
import HeaderSection from './Components/Header/HeaderSection';
import SliderSection from './Components/SliderImg/SliderSection';
import NewsSection from './Components/Body/NewsSection';
import NewGameSection from './Components/Body/NewGameSection';
// import Api from './layout/ExampleApi/tabla';

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
        {/* <Api /> */}
      </div>
    </div>
  );
}


export default App;
