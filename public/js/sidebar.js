const yourChatsOl = document.getElementById(`your-chats-ol`);
const otherChatsOl = document.getElementById(`other-chats-ol`);

const url = `http://localhost:3000/api/conversations`
fetch(url, {
    method: `GET`,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
}).then(res => res.json())
.then(res => {
    const newUrl = `http://localhost:3000/`
    window.location.href = newUrl;
}) .catch(err => {
    console.error(err);
});