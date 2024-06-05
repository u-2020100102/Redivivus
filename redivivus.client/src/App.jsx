import React from "react";
import "./output.css";
import "./App.css";
import Main from "./pages/Main";
import useAuthToken from "./hooks/useAuthToken";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import ProductPage from "./pages/ProductPage";

function App() {
  const hasToken = useAuthToken();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// async function populateWeatherData() {
//     const response = await fetch("weatherforecast");
//     const data = await response.json();
//     setForecasts(data);
//   }
