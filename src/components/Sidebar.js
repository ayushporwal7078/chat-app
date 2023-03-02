import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function Sidebar() {
 const rooms = ['first Rooms', 'Second Rooms', 'Third Rooms']
 
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
    </>
  )
}
