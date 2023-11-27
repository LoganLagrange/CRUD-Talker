const { json } = require("body-parser");

function saveMessage(msg) {
    console.log(`function trigger`);
    const url = `http://localhost:3000/api/messages`
    const message = {
        content: msg,
        conversation_id: "2"
    }
    console.log(JSON.stringify(message));
    
    fetch(url, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    }).then(res => res.json())
    .then(res => {
        console.log(res);
    }) .catch(err => {
        console.error(err);
    });
}

module.exports = saveMessage;