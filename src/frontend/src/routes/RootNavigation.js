import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import FindPw from '../components/Login/FindPw'

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;
