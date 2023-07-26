import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import FindPw from '../components/Login/FindPw';
import SignUpContainer from '../components/SignUp/containers/SignUpContainer';
import AgreementContainer from '../components/SignUp/containers/AgreementContainer';

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/agreement" element={<AgreementContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
