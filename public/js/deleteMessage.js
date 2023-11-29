
function deleteMessage(targetMsg) {


    const url = `http://${process.env.NODE_ENV}/api/message${messageidhere}`;
    fetch(url, {
        method: `DELETE`,
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
        if(response.ok) {
            const deletedMess = document.getElementById(`${messageId}`);
            if(deletedMess) {
                deletedMess.remove();
            }
        }
    }).catch(err => {
        console.error(err);
    });
}

module.exports = deleteMessage;