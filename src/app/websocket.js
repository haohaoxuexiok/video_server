function useWebsocket() {
  var userNum = 0
  const webSocket = require("ws");
  const server = new webSocket.Server({ port: 8000 });
  function bindEvent() {
    server.on("open", handleOpen);
    server.on("close", handleClose);
    server.on("error", handleError);
    server.on("connection", handleConnection);
  }
  function handleOpen(e) {
    console.log("open");
  
  }
  function handleClose(e) {
    userNum--
    console.log("close",userNum);
  }
  function handleError(e) {
    console.log("err");
  } 
  function handleConnection(ws) {
    userNum++
  //  console.log('connection');
  ws.emit('stats', { userNum: userNum });
    ws.on("message", (value) => {
      server.clients.forEach((item) => {
        item.send(value.toString());
         
      });
      ws.on('disconnect', function() {
        userNum--
      })

    ws.emit('stats', { userNum: userNum });
      console.log('Connected clients:', userNum)
    });

    console.log(userNum);
  }
  bindEvent(); 
}

module.exports = {
    useWebsocket
}
