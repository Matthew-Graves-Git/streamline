const { WebSocketServer } = require('ws');
const crypto = require('crypto');
const http = require('http');

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const port = 8000;
const wsServer = new WebSocketServer({ server });
const messagelog = [];

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

wsServer.on('connection', ws => {
    console.log('New client connected!')
    const newClient = Array.from(wsServer.clients).pop()
    console.log(messagelog)
    messagelog.forEach(message =>{
        newClient.send(`${message}`)
    })
    ws.send('connection established')
    ws.on('close', () => console.log('Client has disconnected!'))
    ws.on('message', data => {
        messagelog.push(`${data}`);
      wsServer.clients.forEach(client => {
        console.log(`distributing message: ${data}`)
        client.send(`${data}`)
      })
    })
    ws.onerror = function () {
      console.log('websocket error')
    }
})
   

// wsServer.on('message', (messageAsString) => {
//     console.log("message recieved")
//     const message = JSON.parse(messageAsString);
//     const metadata = clients.get(wsServer);
//     console.log(message)

//     message.sender = metadata.id;
//     message.color = metadata.color;
//     const outbound = JSON.stringify(message);

//     [...clients.keys()].forEach((client) => {
//         client.send(outbound);
//     });
// });

