// CHAT ROOM PAGE logic
const yourChatsUl = document.getElementById(`your-chats-ul`);
const otherChatsUl = document.getElementById(`other-chats-ul`);
const chatUl = document.getElementById(`chat-ul`);
const chatInput = document.getElementById(`chat-input`);
const chatForm = document.getElementById(`chat-form`);
const logoutBtn = document.getElementById(`logout-btn`);
// const chatContainer = document.getElementById(`chat-container`);
const chatMessages = document.getElementById(`chat-messages`);
const chatPageLogo = document.getElementById(`chat-page-logo`);

// set chat container to not display by default
chatMessages.style.display = `none`;
chatForm.style.display = `none`;
chatPageLogo.style.display = `flex`;


// gets all conversations the user owns
const url = `http://localhost:3000/api/conversations/owner`
fetch(url, {
    method: `GET`,
    headers: {
        "Content-Type": "application/json",
    },

}).then(res => res.json())
    .then(res => {
        console.log(res)
        // calls render your chats function
        renderYourChats(res);
    }).catch(err => {
        console.error(err);
    });

// render other chats function
// renders chats user owns 
function renderYourChats(chats) {
    if (chats) {
        chats.forEach(item => {
            const yourChatsLi = document.createElement(`li`);
            yourChatsLi.textContent = `${item.conversation_name}`
            yourChatsLi.addEventListener('click', () => conversationClick(item.conversation_name, item.id));
            yourChatsUl.appendChild(yourChatsLi);
        });
    }
}

// Event handler for clicking on the conversation
// DO NOT REMOVE UNUSED CONVERSATION ID, will break for witchcraft reasons
function conversationClick(conversation_name, roomId) {
    // set chat container to show up when conversation is clicked
    chatPageLogo.style.display = `none`;
    chatMessages.style.display = `block`;
    chatForm.style.display = `block`;
    
    console.log(`roomId:` + roomId);
    // calls fetch messages function
    fetchMessages(roomId);
    // calls socket setup function
    const socket = socketSetup(roomId);
    // creates event listener on the chat form calls submit form function
    chatForm.addEventListener(`submit`, (e) => submitForm(e, roomId, socket));
}

// submit form function
// calls save message function
function submitForm(e, roomId, socket){
    e.preventDefault();
    saveMessage(chatInput.value, roomId, socket)
}

// fetch messages function
// issues get request to server to get all messages in the conversation
function fetchMessages(roomId) {
    const chatUrl = `http://localhost:3000/api/messages/inconvo/${roomId}`
    fetch(chatUrl, {
        method: `GET`,
        headers: {
            "Content-Type": "application/json",
        },

    }).then(res => res.json())
        .then(res => {
            console.log(res)
            // calls render messages function
            renderMessages(res);
        }).catch(err => {
            console.error(err);
        });

}

// render messages function
// renders historical messages in the chat window
function renderMessages(chats) {
    if (chats) {
        chats.forEach(item => {
            const yourMessagesLi = document.createElement(`li`);
            yourMessagesLi.textContent = `${item.content}`
            chatUl.appendChild(yourMessagesLi);
        });
    }
}

// socket setup function
// sets up socket initialization
function socketSetup(roomId) {
    const socket = io(`http://localhost:3000`);

    // Event listener for successful connection
    socket.on(`connect`, () => {
        console.log(`Connected to server`);
    });

    // Event listener for room joining
    socket.on(`join room`, (room) => {
        console.log(`joined room: `, room);
    });

    // Event listener for incoming messages
    socket.on(`chat message`, (msg) => {
        console.log(`Message from server:`, msg);
        // Display the message on the page
        renderLive(msg);
    });

    // Emit the 'join room' event
    socket.emit(`join room`, roomId);

    return socket;
}

// renderlive function
// renders messages recieved by socket live onto the page
function renderLive(msg) {
    const chatLi = document.createElement(`li`);
    chatLi.textContent = `${msg}`
    chatUl.appendChild(chatLi);
    chatInput.value = ``;
}

// send message function
// sends a message to the server
function sendMessage(socket, message, conversationId) {
    if(socket.connected) {
    socket.emit(`chat message`, message, conversationId);
    } else {
        console.log(`socket not connected`);
    }

}

// save messsage function
// issues a post request to the server to save messages in the database
function saveMessage(msg, conversationId, socket) {
    console.log(`roomId save message: ${conversationId}`);
    const message = {
        content:msg,
	    conversation_id:conversationId
    }

    const url = `http://localhost:3000/api/messages`
    fetch(url, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    }).then(res => res.json())
        .then(res => {
        // calls send message function
        sendMessage(socket, msg, conversationId);
        }).catch(err => {
            console.error(err);
        });
}

// event listener for the logout button
logoutBtn.addEventListener(`click`, () => logout());

// logout function
// issues delete request to the server to log user out (destroy session data)
function logout(){
    const logoutUrl = `http://localhost:3000/api/users/logout`
    fetch(logoutUrl, {
        method: `DELETE`,
        headers: {
            "Content-Type": "application/json",
        },

    }).then(res => res.json())
        .then(res => {
            window.location.reload();
        }).catch(err => {
            console.error(err);
        });
}

// fetches the conversations the user is in but does not own
const otherUrl = `http://localhost:3000/api/conversations/isin`
fetch(otherUrl, {
    method: `GET`,
    headers: {
        "Content-Type": "application/json",
    },

}).then(res => res.json())
    .then(res => {
        console.log(res)
        // calls render other chats function
        renderOtherChats(res);
    }).catch(err => {
        console.error(err);
    });
  
// render other chats function
// renders chats user is in but does not own
function renderOtherChats(chats) {
    if (chats) {
        chats.forEach(item => {
            if (item.ownerId !== item.userId) {
                const otherChatsLi = document.createElement(`li`);
                otherChatsLi.textContent = `${item.conversation_name}`
                otherChatsLi.addEventListener('click', () => conversationClick(item.conversation_name, item.id));
                otherChatsUl.appendChild(otherChatsLi);
            }
        });
    }
}