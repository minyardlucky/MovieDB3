import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Profile from './components/Profile/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function MainRouter({ user, handleUserLogin, handleUserLogout }) {
  return (
    <BrowserRouter>
      <Nav user={user} handleUserLogout={handleUserLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleUserLogin={handleUserLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Fixed profile route */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile user={user} />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;


