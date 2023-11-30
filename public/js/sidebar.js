const yourChatsOl = document.getElementById(`your-chats-ol`);
const otherChatsOl = document.getElementById(`other-chats-ol`);

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
            const yourChatsLi = document.createElement(`li`);
            yourChatsLi.textContent = `${item.conversation_name}`
            yourChatsOl.appendChild(yourChatsLi);
        });
    }
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
                otherChatsOl.appendChild(otherChatsLi);
            }
        });
    }
}