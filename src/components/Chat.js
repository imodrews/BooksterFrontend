import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";


// let socket;


const Chat = () => { 
     let location = useLocation();
const [ name, setName ] = useState('');
const [ room, setRoom ] = useState('');
const ENDPOINT = 'localhost:3000/chat';
 
useEffect(() => {
    const { name, room } = queryString.parse(location.search)

 const socket = io(ENDPOINT), {
        withCredentials: true,
        extraHeaders:{
            "x-secret-token": "Bookster"
        }
    }; 
  
    setName(name);
    setRoom(room); 

    socket.emit('join', { name, room });

}, [ENDPOINT, location.search]);

    return(  
        <h1>Chat</h1>
    )
}
export default Chat;