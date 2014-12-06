var server = require('http').createServer();
var io = require('socket.io').listen(server);
var clients = {};

server.listen(3000,function(req,res){
  console.log('Server Running');
});

io.sockets.on('connection', function(socket){

  socket.on('registerUser', function(userName){
    if(!clients.hasOwnProperty(userName)){
      socket.userName = userName;
      clients[userName] = socket;
      console.log(Object.keys(clients));
      io.sockets.emit('registerResponse',{status:'success',users:Object.keys(clients)});
    }
    else{
      io.emit('registerResponse',{status:'fail',message:'Username already exists'});
    }
  });

  socket.on('sendMessage', function(data){
    if(clients.hasOwnProperty(data.receiverName)){
      clients[data.receiverName].emit('receiveMessage',data);
    }
    else{
      clients[data.senderName].emit('sendErrorResponse','Your partner ' + data.receiverName + ' was gone');
    }
  });

  socket.on('disconnect',function(){
    console.log('disConnect:' + socket.userName);
    delete clients[socket.userName];
    io.sockets.emit('registerResponse',{status:'success',users:Object.keys(clients)});
  });

});
