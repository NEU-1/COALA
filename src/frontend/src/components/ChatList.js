import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import useReadRoom from '../hooks/chatting/useReadRoom'
import { fetchRoom } from '../api/nodeServer/chatting'
import timestamp from '../utils/timestamp';


const ChatList = () => {
  const [roomName, setRoomName] = useState("");
  const [user_id, setUser] = useState("");
  

  let Lists = [{
    id : 9998,
    name:'테스트룸1',
    pp_id : null,
    pr_id : null,
    created_at : timestamp()
  }, {
    id : 9999,
    name:'테스트룸2',
    pp_id : null,
    pr_id : null,
    created_at : timestamp()
  }];

  let {data} = useReadRoom();
  
  let rooms = data ? data.rooms : [];
  Lists = [...Lists, ...rooms]
  
  const handleClick = async () =>{
    const user_number = Number(user_id);
    await fetchRoom.create({roomName, user_id : user_number});
  }
  
  return (
    <div>
      <h1>This is Chat Page</h1>
      <label>사용자 : </label>
      <input value={user_id} onChange={(event) => setUser(event.target.value)} />
      <hr/>
      <input value={roomName} onChange={(event) => setRoomName(event.target.value)} />
        <button onClick={handleClick}>방 생성</button>
      <hr/>
      <hr/>
      {Lists.map(item => (
        <li key={item.id}>
          <NavLink to={`/chat/${item.name}`}>room : {item.name}</NavLink>
        </li>
      ))}
    </div>
  );
};

export default ChatList;