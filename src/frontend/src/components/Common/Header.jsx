import React from 'react'
import './Header.css'


const Header = () => {
  return (
    <header id='page-header'>
        <div>
            <div id="main-header">
                <div>
                    <a href="/">logo</a>
                </div>
                <div id='login'>
                    <a href="/login">login</a>
                </div>
            </div>
            <div id="buttons">
            <div >
                <button>자유게시판</button>
            </div>
            <div><button> store </button></div>
            <div><button>이용자게시판</button></div>
            </div>
        </div>
    </header>
  )
}


export default Header;