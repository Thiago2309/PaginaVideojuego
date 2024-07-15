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
import ProfilePage from "../pages/Profile/ProfilePage";
import { AuthProvider } from "../context/AuthContext";
import NewsView from "../pages/News/NewsView";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gamedetails" element={<GameDetails />} />
          <Route path="/gameofferts" element={<GameOfferts />} />
          <Route path="/newsgame" element={<NewsView />} />
          <Route path="/gameofferts/:id" element={<GameOfferts />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/gamecatalog" element={<GameCatalog />} />
          <Route path="/gameoffert" element={<GameOffert />} />
          <Route path="/gamecommunity" element={<GameCommunity />} />
          <Route path="/publicationdetails/:id" element={<PublicationDetails />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
