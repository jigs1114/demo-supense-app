import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import CartList from './pages/CartList';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {


  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/cartlist' element={<CartList />}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/details/:id' element={<ProductDetails />}/>
        <Route path='/' element={<ProductList/>}/>
      </Routes>
    </>
  );
}

export default App;
