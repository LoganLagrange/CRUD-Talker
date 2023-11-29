

// LOGIN PAGE logic
const loginForm = document.getElementById(`login-form`);
const loginUsername = document.getElementById(`login-username`);
const loginPassword  = document.getElementById(`login-password`);

loginForm.addEventListener(`submit`, (e) =>  {
    loginFunc(loginUsername, loginPassword);
})

function loginFunc(username, password){
    url = `http://localhost:3000/api/users/login`
    
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