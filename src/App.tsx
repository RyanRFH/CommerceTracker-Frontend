import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/LoginPage';
import ProductsSearch from './pages/Products/ProductsSearch/ProductsSearch';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='products' element={<ProductsSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
