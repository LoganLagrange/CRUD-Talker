const chatUl = document.getElementById(`chat-ul`);

const chatUrl = `http://localhost:3000/api/messages/inconvo`
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

function renderMessages(chats) {
    if (chats) {
        chats.forEach(item => {
            const yourMessagesLi = document.createElement(`li`);
            yourMessagesLi.textContent = `${item.content}`
            chatUl.appendChild(yourMessagesLi);
        });
    }
}