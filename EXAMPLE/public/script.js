//This code snippet is part of a client-side script for a chat application using Socket.IO. 
// It handles connecting to the server, sending and receiving messages, and dynamically updating 
// the webpage with chat room and message information.

// Connect to the Socket.IO server
const socket = io('http://localhost:3000')
// Get the message container element by its ID
const messageContainer = document.getElementById('message-container')
// Get the room container element by its ID
const roomContainer = document.getElementById('room-container')
// Get the message form element by its ID
const messageForm = document.getElementById('send-container')
// Get the message input element by its ID
const messageInput = document.getElementById('message-input')

// Check if the message form exists
if (messageForm != null) {
  // Prompt the user for their name
  const name = prompt('What is your name?')
  // Append a message indicating that the user has joined
  appendMessage('You joined')
  // Emit a 'new-user' event with the room name and user name
  socket.emit('new-user', roomName, name)

  // Add an event listener for form submission
  messageForm.addEventListener('submit', e => {
    // Prevent the default form submission behavior
    e.preventDefault()
    // Get the value of the message input
    const message = messageInput.value
    // Append the message to the chat
    appendMessage(`You: ${message}`)
    // Emit a 'send-chat-message' event with the room name and message
    socket.emit('send-chat-message', roomName, message)
    // Clear the message input field
    messageInput.value = ''
  })
}

// Listen for 'room-created' events from the server
socket.on('room-created', room => {
  // Create a new div element for the room
  const roomElement = document.createElement('div')
  // Set the text of the room element
  roomElement.innerText = room
  // Create a new anchor element for joining the room
  const roomLink = document.createElement('a')
  // Set the href attribute of the room link
  roomLink.href = `/${room}`
  // Set the text of the room link
  roomLink.innerText = 'join'
  // Append the room element and link to the room container
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

// Listen for 'chat-message' events from the server
socket.on('chat-message', data => {
  // Append the received chat message
  appendMessage(`${data.name}: ${data.message}`)
})

// Listen for 'user-connected' events from the server
socket.on('user-connected', name => {
  // Append a message indicating that a user has connected
  appendMessage(`${name} connected`)
})

// Listen for 'user-disconnected' events from the server
socket.on('user-disconnected', name => {
  // Append a message indicating that a user has disconnected
  appendMessage(`${name} disconnected`)
})

// Define a function to append messages to the message container
function appendMessage(message) {
  // Check if the message container exists
  if (messageContainer) {
    // Create a new div element for the message
    const messageElement = document.createElement('div')
    // Set the text of the message element
    messageElement.innerText = message
    // Append the message element to the message container
    messageContainer.append(messageElement)
  } else {
    // Log an error if the message container is null
    console.error('messageContainer is null')
  }
}