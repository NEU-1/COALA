import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import useReadRoom from '../hooks/chatting/useReadRoom'
import { fetchRoom } from '../api/nodeServer/chatting'
import timestamp from '../utils/timestamp';
import _ from 'lodash'

const ChatList = () => {
  const [roomName, setRoomName] = useState("");
  const [member_id, setUser] = useState("1");
  

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
  console.log(data);
  let rooms = data && !_.isEmpty(data) ? data.rooms : [];
  Lists = [...Lists, ...rooms]
  console.log(Lists)
  const handleClick = async () =>{
    const user_number = Number(member_id);
    await fetchRoom.create({roomName, member_id : user_number});
  }
  
  return (
    <div>
      <h1>This is Chat Page</h1>
      <label>사용자 : </label>
      <input value={member_id} onChange={(event) => setUser(event.target.value)} />
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