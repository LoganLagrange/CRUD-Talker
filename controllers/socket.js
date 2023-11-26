module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Event Name 'chat message'
        socket.on('chat message', (msg) => {
            console.log('message received:', msg);


            //TODO SAVE THE MESSAGE TO THE DB INSTEAD OF A SIMPLE EMIT
        

            // Broadcast
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        //ADD MORE SOCKET EVENTS DOWN HERE AS NEEDED
    });
};