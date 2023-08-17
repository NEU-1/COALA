import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import ChatOpenContainer from '../components/Chat/containers/ChatOpenContainer'
import HeaderContainer from '../components/Common/containers/HeaderContainer'
import Footer from '../components/Common/Footer'

const Layout = () => {
  return (
    <SLayout>
        <HeaderContainer/>
        <Outlet/>
        <ChatOpenContainer/>
        <Footer/>
    </SLayout>
  )
}

const SLayout = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
`

export default Layout