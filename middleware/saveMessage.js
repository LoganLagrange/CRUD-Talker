
function saveMessage(msg) {
    console.log(`function trigger`);
    const url = `http://` + process.env.NODE_ENV + `/api/messages`
    console.log(url);
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