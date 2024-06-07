import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/LoginPage';
import ProductsSearch from './pages/Products/ProductsSearch/ProductsSearch';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Signup from './pages/Signup/Signup';
import Basket from './pages/Basket/Basket';

function App() {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='products' element={<ProductsSearch />} />
          <Route path='signup' element={<Signup />} />
          <Route path='basket' element={<Basket />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
