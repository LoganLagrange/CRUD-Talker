//const saveMessage = require(`../middleware/saveMessage`);
// const saveMessage = require(`../middleware/saveMessage`);
//alert(`hello`)
const socket = io(`http://localhost:3000`); // APP SERVER ID GOES HERE
//roomNumber = socket.rooms[1];
socket.on(`connect`, () => {
    console.log(`Connected to server`);
});
socket.on(`chat message`, (msg) => {
    console.log(`Message from server:`, msg);
    // Display the message on the page
    const messagesDiv = document.getElementById(`message-container`);
    messagesDiv.innerHTML += `<p>${msg}</p>`;
});
// Send message to server
document.getElementById(`roomSub`).addEventListener(`submit`, (e) => {
   // e.preventDefault();
    console.log(`hello`)
    const messageInput = document.getElementById(`roomSub`);
    const message = messageInput.value;
    messageInput.value = ``;
    saveMessage(message);
    socket.emit(`chat message`, message);
   // socket.emit(`joinRoom`, roomNumber);
});