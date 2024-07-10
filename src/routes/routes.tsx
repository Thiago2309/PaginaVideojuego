import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import GameDetails from "../pages/GameDetails/GameDetails";
import GameOfferts from "../pages/GameOffert/GameOfferts";
import GameCatalog from "../pages/GameCatalog/GameCatalog";
import GameOffert from "../pages/GameOfferts/GameOfferts";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";

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
          <Route path="/gamecatalog" element={<GameCatalog />} />
          <Route path="/gameoffert" element={<GameOffert />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
