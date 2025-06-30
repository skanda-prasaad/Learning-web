import { useEffect, useRef, useState } from "react";

function App() { 
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessage() {
    if(!socket){
      return;
    }
    const message = inputRef.current.value;
    socket.send(message)
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    }
  }, [])
  return (
    <>
      <input ref={inputRef} type="text" name="" id="" placeholder="enter the message" />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}

export default App;
