
// function saveMessage(msg) {
//     console.log(`function trigger`);
//     const url = `http://` + process.env.NODE_ENV + `/api/messages`
//     console.log(url);
//     const message = {
//         content: msg,
//         conversation_id: "2"
//     }
//     console.log(JSON.stringify(message));
    
//     fetch(url, {
//         method: `POST`,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//     }).then(res => res.json())
//     .then(res => {
//         console.log(res);
//     }) .catch(err => {
//         console.error(err);
//     });
// }

// module.exports = saveMessage;

const { Conversation, Message } = require('../models'); // Import models

function saveMessage(msg, conversationId) {
    console.log(`function trigger`);
    const url = `http://${process.env.NODE_ENV}/api/messages`;
    console.log(url);

    // Check if the conversation exists
    Conversation.findByPk(conversationId)
        .then(conversationExists => {
            if (!conversationExists) {
                throw new Error('Conversation does not exist');
                
            }

            // Prepare the message object
            const message = {
                content: msg,
                conversation_id: conversationId
            };
            console.log(JSON.stringify(message));

            // Save the message
            return fetch(url, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.error('Error saving message:', err.message);
            // error
        });
}

module.exports = saveMessage;