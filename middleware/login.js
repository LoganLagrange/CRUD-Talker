 function loginFunc(username){
    url = process.env.NODE_ENV.join(`/api/users/login`)
    
    const user = {
        username: username
    }
    fetch(url, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then(res => res.json())
    .then(res => {
        console.log(res);
    }) .catch(err => {
        console.error(err);
    });
}

module.exports = loginFunc;