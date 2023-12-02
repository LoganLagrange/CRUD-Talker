const socket=io(`http://localhost:3000`)

const yourChatsUl = document.getElementById(`your-chats-ul`);
const otherChatsUl = document.getElementById(`other-chats-ul`);
const chatUl = document.getElementById(`chat-ul`);
const chatInput = document.getElementById(`chat-input`);
const chatForm = document.getElementById(`chat-form`);
const logoutBtn = document.getElementById(`logout-btn`);

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
            yourChatsLi.textContent = `${item.conversation_name}`
            console.log(item);
            yourChatsLi.addEventListener('click', () => conversationClick(item.conversation_name, item.id));
            yourChatsUl.appendChild(yourChatsLi);
        });
    }
}

function conversationClick(roomName, roomId) {
    console.log(roomId)
    fetchMessages(roomId);
    socketSetup(roomName);
    chatForm.addEventListener(`submit`, (e) => submitForm(e, roomId));
}

function submitForm(e, roomId){
    console.log(roomId)
    e.preventDefault();
    saveMessage(chatInput.value, roomId)
    renderLive(chatInput.value)
}

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
            renderMessages(res);
        }).catch(err => {
            console.error(err);
        });

}



function renderMessages(chats) {
    if (chats) {
        chats.forEach(item => {
            const yourMessagesLi = document.createElement(`li`);
            yourMessagesLi.textContent = `${item.content}`
            chatUl.appendChild(yourMessagesLi);
        });
    }
}

function socketSetup(roomName) {
    socket.on(`connect`, () => {
        console.log(`Connected to server`);
    });

    socket.on(`chat message`, (msg) => {
        console.log(`Message from server:`, msg);
        // Display the message on the page
        renderLive(msg);
    });

    // Send message to server

    // saveMessage(message);

    socket.emit(`joinRoom`, roomName);

}

function renderLive(msg) {
    const chatLi = document.createElement(`li`);
    chatLi.textContent = `${msg}`
    chatUl.appendChild(chatLi);
}

function sendMessage() {
    const message = chatInput.value
    socket.emit(`chat message`, message);

}

function saveMessage(msg, conversationId) {
    console.log(msg, conversationId);
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
            sendMessage()
        }).catch(err => {
            console.error(err);
        });
}

logoutBtn.addEventListener(`click`, () => logout());

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











// const otherUrl = `http://localhost:3000/api/conversations/isin`
// fetch(otherUrl, {
//     method: `GET`,
//     headers: {
//         "Content-Type": "application/json",
//     },

// }).then(res => res.json())
//     .then(res => {
//         console.log(res)
//         renderOtherChats(res);
//     }).catch(err => {
//         console.error(err);
//     });

// function renderOtherChats(chats) {
//     if (chats) {
//         chats.forEach(item => {
//             if (item.ownerId !== item.userId) {
//                 const otherChatsLi = document.createElement(`li`);
//                 otherChatsLi.textContent = `${item.conversation_name}`
//                 otherChatsUl.appendChild(otherChatsLi);
//             }
//         });
//     }
// }