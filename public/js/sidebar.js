const yourChatsUl = document.getElementById(`your-chats-ul`);
const otherChatsUl = document.getElementById(`other-chats-ul`);

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
            yourChatsUl.appendChild(yourChatsLi);
        });
    }
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