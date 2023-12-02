// const saveMessage = require(`../middleware/saveMessage`)

// module.exports = function (io) {
//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         // Event Name 'chat message'
//         socket.on('chat message', (msg) => {
//             console.log('message received:', msg);


//             //TODO 
//             //change the 1 to be dynamic

//             saveMessage(msg,1);
        

//             // Broadcast
//             io.emit('chat message', msg);
//         });

//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//         });

//         //ADD MORE SOCKET EVENTS DOWN HERE AS NEEDED
//     });
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const saveMessage = require(`../middleware/saveMessage`);

// const rooms = {};

// module.exports = function (io) {
//     io.on('connection', (socket) => {
//         console.log('A user connected');

//         // Event for new user joining a room
//         socket.on('new-user', (room, name) => {
//             socket.join(room);
//             if (!rooms[room]) {
//                 rooms[room] = { users: {} };
//             }
//             rooms[room].users[socket.id] = name;
//             socket.to(room).emit('user-connected', name);
//         });

//         // New 'chat message' event
//         socket.on('chat message', (room, msg) => {
//             console.log('message received:', msg);
//             saveMessage(msg, 1);

//             // Broadcast to all clients
//            // io.emit('chat message', msg);

//             io.to(room).emit('chat message', { message: msg, name: rooms[room].users[socket.id] });
//         });

//         // Handling user disconnect
//         socket.on('disconnect', () => {
//             console.log('User disconnected');
//             getUserRooms(socket).forEach(room => {
//                 socket.to(room).emit('user-disconnected', rooms[room].users[socket.id]);
//                 delete rooms[room].users[socket.id];
//             });
//         });

//         // More socket events can be added here
//     });
// };

// // Utility function I need to move
// function getUserRooms(socket) {
//     return Object.entries(rooms).reduce((names, [name, room]) => {
//         if (room.users[socket.id] != null) names.push(name);
//         return names;
//     }, []);
// }

////////////////////////////////////////////////////////////////////////////////////



const rooms = {};

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on(`join room`, (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        })

        socket.on(`disconnect`, () => {
            console.log(`user disconnect`);
        })

        socket.on(`chat message`, (msg, roomId) => {
            io.to(roomId).emit(`chat message`, msg);
        })

        // Prompting for user name and handling new user joining a room
        // socket.on('new-user', (room, name) => {
        //     socket.join(room);
        //     if (!rooms[room]) {
        //         rooms[room] = { users: {} };
        //     }
        //     rooms[room].users[socket.id] = name;

        //     // Notify others in the room
        //     socket.to(room).emit('user-connected', name);

        //     // Append a message in the server console
        //     console.log(`${name} joined ${room}`);
        // });

        // // Handling chat messages
        // socket.on('chat message', (room, message) => {
        //     // Save the message - modify the saveMessage function as necessary
        //       // Assuming socket.id is the user's unique identifier

        //     // Broadcast the message to others in the room
        //     // io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
        // });

        // // Handling user disconnect
        // socket.on('disconnect', () => {
        //     getUserRooms(socket).forEach(room => {
        //         let name = rooms[room].users[socket.id];
        //         socket.to(room).emit('user-disconnected', name);
        //         delete rooms[room].users[socket.id];
        //         console.log(`${name} disconnected`);
        //     });
        // });

        // More socket events can be added here
    });
};

// Utility function to find rooms a user is part of
function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) {
            names.push(name);
        }
        return names;
    }, []);
}