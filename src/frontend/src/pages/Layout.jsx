import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import Header from '../components/Common/Header'

const Layout = () => {
  return (
    <SLayout>
        <Header/>
        <Outlet/>
    </SLayout>
  )
}

const SLayout = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
`

export default Layout