var socket;
var chat = function(){
  var self = this;
    self.isShowChatWindow = ko.observable(false);
    self.userName = ko.observable();
    self.partnerName = ko.observable();
    self.message = ko.observable();
    self.onlineUsers = ko.observableArray([]);
    self.messages = ko.observableArray([]);
    self.errorMessage = ko.observable();

    self.init = function(){
        socket = io.connect('localhost:3000');
    };

    self.registerUser = function(){
        if(self.onlineUsers().indexOf(self.userName()) == -1){
            socket.emit('registerUser',self.userName());
            self.isShowChatWindow(true);
        }
        else{
            toastr.warning('The nickname already taken by others');
        }
    };

    self.sendMessage = function(){
        if(typeof self.partnerName() != 'undefined'){
            var message = {
                type: 'mySelf',
                message: self.message(),
                senderName: self.userName(),
                receiverName: self.partnerName()
            };
            self.messages.push(message);
            $('.messages').scrollTop($('.messages').prop('scrollHeight'));
            message.type = 'partner';
            socket.emit('sendMessage',message);
            self.message(undefined);
        }
        else{
            toastr.error('Choose partner to start chat');
        }
    };

    self.choosePartner = function(data){
        self.partnerName(data);
    };

};

