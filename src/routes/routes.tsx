import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import GameDetails from "../pages/GameDetails/GameDetails";
import GameOfferts from "../pages/GameOffert/GameOffert";
import GameCatalog from "../pages/GameCatalog/GameCatalog";
import GameOffert from "../pages/GameOfferts/GameOfferts";
import GameCommunity from "../pages/GameCommunity/GameCommunity";
import PublicationDetails from "../pages/PublicationDetails/PublicationDetails";
import PrivateRoute from "./PrivateRoute";
import AdminPublic from "../pages/Admin/AdminCrud/VideoGame/GameViewCrud";
import AdminPublicOption from "../pages/Admin/AdminOpcion/AdminPublicNew";
import AdminPublicOfferts from "../pages/Admin/AdminCrud/Offerts/OffertsViewCrud";
import ProfilePage from "../pages/Profile/ProfilePage";
import { AuthProvider } from "../context/AuthContext";
import Nosotros from "../Components/AboutUs/Nosotros";
import Error404 from "../Components/HttpHandler/404";
import NewsView from "../pages/News/NewsView";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gamedetails/:id" element={<GameDetails />} />
          <Route path="/gameofferts" element={<GameOfferts />} />
          <Route path="/newsgame" element={<NewsView />} />
          <Route path="/gameofferts/:id" element={<GameOfferts />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/gamecatalog" element={<GameCatalog />} />
          <Route path="/gameoffert" element={<GameOffert />} />
          <Route path="/gamecommunity" element={<GameCommunity />} />
          <Route
            path="/publicationdetails/:id"
            element={<PublicationDetails />}
          />
          <Route path="/404" element={<Error404 />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/publicationdetails/:id" element={<PublicationDetails />} />
          {/* solo para admin */}
          <Route path="/adminpublicoption" element={<AdminPublicOption />} />
          <Route path="/adminpublic" element={<AdminPublic />} />
          <Route path="/adminpublicOffert" element={<AdminPublicOfferts />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
