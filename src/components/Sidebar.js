import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { AppContext } from '../context/appContext'

export default function Sidebar() {
 
const user = useSelector(state => state.user)
const {socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom} = useContext(AppContext);

useEffect(() => {
 
 if (user) {
  setCurrentRoom('general');
  getRooms();
  socket.emit('join-room', 'general');
  socket.emit("new-user")
 }   

}, [])

socket.off("new-user").on("new-user", (payload) => {
   setMembers(payload)
})



function getRooms() {
  fetch("http://localhost:5001/rooms").then((res) => res.json()).then(data => setRooms(data))
}
if (!user) {
  return<></>
}

  return (
    <>
     <h2>Available rooms</h2> 
     <ListGroup>
    {rooms.map((room, id) =>( 
        <ListGroup.Item key={id}>
          {room}
          </ListGroup.Item>
    ))}
     </ListGroup>

     <h2>Members</h2>
     <ListGroup>
     {members.map((member, id) =>( <ListGroup.Item key={id} style={{cursor: "pointer"}}>
          {member.name}
     </ListGroup.Item>))}
     </ListGroup>
    </>
  )
}
