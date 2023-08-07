import { Route, Routes } from 'react-router-dom'

import Main from '../components/Main';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';

const Router = () =>{
  return(
    <Routes> 
      <Route path="/" element={<Main />} />
      <Route path="/chatList" element={<ChatList />} />
      <Route path="/chat/:roomName" element={<ChatRoom />} />
    </Routes>
  )
}

export default Router;