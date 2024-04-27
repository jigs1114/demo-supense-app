import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import CartList from './CartList';
const App = () => {


  return (
    <>
      <Routes>
        <Route path='/cartlist' element={<CartList />}/>
        <Route path='/details/:id' element={<ProductDetails />}/>
        <Route path='/' element={<ProductList/>}/>
      </Routes>
    </>
  );
}

export default App;
