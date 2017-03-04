let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-note', (note) => {
    io.emit('note', {type:'new-note', note});    
  });

});

http.listen(5000, () => {
  console.log('started on port 5000');
});
