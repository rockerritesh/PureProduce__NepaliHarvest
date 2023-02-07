import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import SignInForm from './Components/Screens/LoginSignUp/SignInForm';
import Seller from './Components/Screens/SellerDetail/Seller';
import Shop from './Components/Screens/Shop/Shop';

const MainApp = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route exact path="/login" element={<SignInForm/>} />
          <Route exact path="/becomeafarmer" element={<Seller/>} />
          <Route exact path="/shop" element={<Shop/>} />
        </Routes>
      </Router>
    </>
  )
}

export default MainApp
