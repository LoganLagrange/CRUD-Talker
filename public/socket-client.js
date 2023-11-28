//const saveMessage = require("../middleware/saveMessage");

const socket = io('http://localhost:3000'); // APP SERVER ID GOES HERE

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('chat message', (msg) => {
    console.log('Message from server:', msg);
    // Display the message on the page
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p>${msg}</p>`;
});

// Send message to server
document.getElementById('messageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    messageInput.value = '';

    // saveMessage(message);
    socket.emit('chat message', message);
});