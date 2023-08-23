import React, { useState, useEffect, useMemo } from 'react';

const Chat = () => {
    const socket = useMemo(()=>new WebSocket("ws://localhost:8000"),[]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState();

    // const msg = {
    //     type: "message",
    //     text: document.getElementById("text").value,
    //     id: clientID,
    //     date: Date.now(),
    // };

    // Connection opened
    // socket.addEventListener("open", (event) => {
    // console.log(event);
    // socket.send("Hello Server!");
    // });

    // socket.onopen = (event) =>{
    //     console.log("sent");
    //     socket.send("Hello Server!");
    // }

    // Listen for messages
    useEffect(() => {
        socket.addEventListener("message", (event) => {
            setMessages([...messages,event.data]);
        });
    }, [messages,socket]);

    const sendMessage = (e) =>{
        e.preventDefault();
        socket.send(message)
    }
    


    return (
        <div>
            <form onSubmit={sendMessage}>
                <label>
                    Message:
                    <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <ol className='flex-col text-black text-2xl'>
                {messages && messages.map((message)=>{
                    return(
                        <li>
                            {message}
                        </li>
                    )
                })

                }
            </ol>
        </div>
    );
}
 
export default Chat;