 function loginFunc(username, password){
    url = `http://` + process.env.NODE_ENV + `api/users/login`
    
    const user = {
        username: username,
        password: password
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