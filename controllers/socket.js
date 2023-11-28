const saveMessage = require(`../middleware/saveMessage`)

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Event Name 'chat message'
        socket.on('chat message', (msg) => {
            console.log('message received:', msg);


            //TODO 
            //change the 1 to be dynamic

            saveMessage(msg,1);
        

            // Broadcast
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        //ADD MORE SOCKET EVENTS DOWN HERE AS NEEDED
    });
};
