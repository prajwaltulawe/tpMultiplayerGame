const io = require('socket.io')(8000, {   // SOCKET PORT
  cors: {                                 // CROSS ORIGIN PERMISSION FOR CLIENT ADDRESS
    origin: ['http://localhost:8080'],    
  },
});

// DECLARING ARRAY OF users
const users = [];

io.on('connection', socket =>{

    socket.on('new-user-joined', user_name =>{
      users.push(user_name)
      if (users.length == 2) {
        console.log("you can play")
        socket.broadcast.emit('start-game', {new_user_name: users[socket.id], new_user_id: socket.id});
      }
    });

    socket.on('received-response', receivedBoxId =>{
      socket.broadcast.emit('your-turn', {receivedBoxId});
    });

    socket.on('caught', receivedBoxId =>{
      socket.broadcast.emit('you-won', {receivedBoxId});
    });
  });

