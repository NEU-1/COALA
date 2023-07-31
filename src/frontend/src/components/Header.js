import React from 'react';
import {NavLink} from 'react-router-dom'

function Header() {

  return (
    <div className="header">
      <h1>
        <NavLink to='/'>기본 툴</NavLink>
      </h1>
      <div className="menu">
        <NavLink to='/chatList' className="link">채팅방으로</NavLink>|
      </div>
    </div>
  );
}

export default Header;
