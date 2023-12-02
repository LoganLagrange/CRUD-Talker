// CHAT ROOM PAGE logic
const yourChatsUl = document.getElementById(`your-chats-ul`);
const otherChatsUl = document.getElementById(`other-chats-ul`);
const chatUl = document.getElementById(`chat-ul`);
const chatInput = document.getElementById(`chat-input`);
const chatForm = document.getElementById(`chat-form`);
const logoutBtn = document.getElementById(`logout-btn`);
const conversationNameHeading = document.getElementById(`conversation-name-heading`);
const deleteConvBtn = document.getElementById(`delete-conv-btn`);

deleteConvBtn.style.display = `none`;

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
        renderYourChats(res);
    }).catch(err => {
        console.error(err);
    });

function renderYourChats(chats) {
    if (chats) {
        chats.forEach(item => {
            console.log(item);
            const yourChatsLi = document.createElement(`li`);
            yourChatsLi.textContent = `${item.conversation_name}`;
            yourChatsLi.classList.add(`conversation-li`, `box`, `p-3`, `m-2`);
            yourChatsLi.addEventListener('click', () => conversationClick(item.conversation_name, item.id, item.owner_id));
            yourChatsUl.appendChild(yourChatsLi);
        });
    }
}

// Event handler for clicking on the conversation
function conversationClick(conversationName, roomId, ownerId) {
    conversationNameHeading.textContent = conversationName;
    // calls fetch messages function
    fetchMessages(roomId);
    // calls socket setup function
    const socket = socketSetup(roomId);
    // creates event listener on the chat form calls submit form function
    chatForm.addEventListener(`submit`, (e) => submitForm(e, roomId, socket));
    if(ownerId == roomId) {
        deleteConvBtn.style.display = `inline-block`
    }
}

// submit form function
// calls save message function
function submitForm(e, roomId, socket) {
    e.preventDefault();
    saveMessage(chatInput.value, roomId, socket)
}

// fetch messages function
// issues get request to server to get all messages in the conversation
let currentRoomId;
function fetchMessages(roomId) {
    currentRoomId = roomId;
    const chatUrl = `http://localhost:3000/api/messages/inconvo/${roomId}`
    fetch(chatUrl, {
        method: `GET`,
        headers: {
            "Content-Type": "application/json",
        },

    }).then(res => res.json())
        .then(res => {
            const userId = res.userId
            const dbConversation = res.dbConversation
            console.log(res)
            console.log(userId)
            // calls render messages function
            renderMessages(dbConversation, userId);
        }).catch(err => {
            console.error(err);
        });

}

// render messages function
// renders historical messages in the chat window
function renderMessages(chats, userId) {
    console.log(userId)
    if (chats) {
        chats.forEach(item => {
            const yourMessagesLi = document.createElement(`li`);
            if (item.id === userId) {
                yourMessagesLi.setAttribute("class", "outgoingMsg");
            } else {
                yourMessagesLi.setAttribute("class", "incomingMsg");
            }
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

function renderLive(msg) {
    const chatLi = document.createElement(`li`);
    chatLi.textContent = `${msg}`
    chatUl.appendChild(chatLi);
    chatInput.value = ``;
    // if (msg.id === req.session.user.id) {
    //     yourMessagesLi.setAttribute("class","outgoingMsg");
    // } else {
    //     yourMessagesLi.setAttribute("class","incomingMsg");
    // }
}

function sendMessage(socket, message, conversationId) {
    if (socket.connected) {
        socket.emit(`chat message`, message, conversationId);
    } else {
        console.log(`socket not connected`);
    }

}

function saveMessage(msg, conversationId, socket) {
    console.log(`roomId save message: ${conversationId}`);
    const message = {
        content: msg,
        conversation_id: conversationId
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
            sendMessage(socket, msg, conversationId);
        }).catch(err => {
            console.error(err);
        });
}

logoutBtn.addEventListener(`click`, () => logout());

function logout() {
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











const otherUrl = `http://localhost:3000/api/conversations/isin`
fetch(otherUrl, {
    method: `GET`,
    headers: {
        "Content-Type": "application/json",
    },

}).then(res => res.json())
    .then(res => {
        console.log(res)
        renderOtherChats(res);
    }).catch(err => {
        console.error(err);
    });

function renderOtherChats(chats) {
    if (chats) {
        chats.forEach(item => {
            if (item.ownerId !== item.userId) {
                const otherChatsLi = document.createElement(`li`);
                otherChatsLi.textContent = `${item.conversation_name}`
                otherChatsLi.classList.add(`conversation-li`, `box`, `p-3`, `m-2`);
                otherChatsLi.addEventListener('click', () => conversationClick(item.conversation_name, item.id));
                otherChatsUl.appendChild(otherChatsLi);
            }
        });
    }
}

// Event listener for the delete conversation button
deleteConvBtn.addEventListener(`click`, () => deleteConversation(currentRoomId));

// delete conversation function
// issues a delete request to  the current room open
function deleteConversation(convId) {
    const otherUrl = `http://localhost:3000/api/conversations/${convId}`
    fetch(otherUrl, {
        method: `DELETE`,
        headers: {
            "Content-Type": "application/json",
        },

    }).then(res => res.json())
        .then(res => {
            location.reload();
        }).catch(err => {
            console.error(err);
        });
}