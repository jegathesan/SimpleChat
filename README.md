SimpleChat
==========

Simple 1-1 Chat  using Socket IO and Node js

Install a node js to your machine, you can get it from this link
        http://nodejs.org/
        
To check if the node js is installed successfully by follwing the below steps

        1. Open command prompt
        2. Type node -v
        3. It shows some version code about node js installed on your machine

Node project
============

To create a node project follow the below steps

        1. Create a folder with your project title in where you want(location)
        2. And create a package.JSON file inside that directory with following information
                {
        	"name":"Chat",
        	"version":"0.0.1",
        	"Private":"true",
        	"dependencies":{
        		        "socket.io":"1.2.1",
        	                }
                }
        3. Do shift + right click, from that choose 'open command window here'
        4. Type
                npm install and hit enter
        5. This will include all the neccessory libraries which we mentioned in the package file at dependencies property


Chat Server [Node]
==================

To create a http server we should require a library for that
        
        var server = require('http').createServer();
                
And soket io need to listen the server which you created at first line
        
        var io = require('socket.io').listen(server);
        
Atlast the server sets to listen the port number 3000 (whatever you want)        
        
        server.listen(3000,function(req,res){
          console.log('Server is runnning');
        });
        //Now our server will listens the port number 3000 and handled requests which are comming in this port and give response

Then we need to handle all the requests from the client. When a new user joins in the chat the below state will accept that client socket

        io.sockets.on('connection', function(socket){
        	//your stuff goes here after socket was connected
        	//the 'socket' is the current client connection
        	//this will be used for later	
        });

To broadcast the message to entire users in chat use

        io.sockets.emit(<functionName>, <message>);
        //io.sockets.emit will send given message to all the connected sockets
        //and that will recevied by client in the function we are mentioned as first parameter

Send message to a particular client, you should know their socket connection

        socket.emit(<functionName>, <message>);
        //here socket is the client socket of the required client
        //you can store the each client sockets by their unique identification while made a connection.

To create your own new function, use the below code inside the connection function

        socket.on(<functionName>, function(<parameterlist>){
        	//your stuff goes here after socket was connected
        }):
        
When the client will disconnected the below function will takes place

        socket.on('disconnect',function(){
                //disonnected
        });

Run Chat Server
===============

To run a chat server follow below steps

        1. Go to directory where the chat.js present
        2. Do shift + right click and choose 'open command window here'
        3. Type node chat.js
                //this will execute your server node


Chat Client
===========

For implementing chat client the below libraries are used.

        1. socket io for websocket connection
        2. knockout js for data binding
        3. toastr js for show error messages and warnings

Connect to the chat server

        socket = io.connect('localhost:3000');

Create your own function  

        socket.on('registerResponse', function(data){
                //this function will call automatically when the server emits message like
                //sockit.emit('registerResponse', 'message');
                //the 'data' is the message
        }):

Like wise you can create any number of functions 
