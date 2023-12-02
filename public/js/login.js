// LOGIN PAGE logic
const loginForm = document.getElementById(`login-form`);
const loginUsername = document.getElementById(`login-username`);
const loginPassword  = document.getElementById(`login-password`);
const loginWarning =  document.getElementById(`login-warning`);

loginForm.addEventListener(`submit`, (e) =>  {
    e.preventDefault();
    loginFunc(loginUsername.value, loginPassword.value);
})

function loginFunc(username, password){
    const url = `http://localhost:3000/api/users/login`
    
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
    }).then(res => {
        if(!res.ok) {
            if(res.status === 401) {
                return Promise.reject({status: 401, message: `Incorrect username or password!`})
            } else {
                return Promise.reject({status: res.status, message: `Unexpected error occurred!`})
            }
        }
        return res.json;
    }).then(res => {
        const newUrl = `http://localhost:3000/`
        window.location.href = newUrl;
    }) .catch(err => {
        console.error(err);
        loginWarning.textContent =  err.message;
    });

    
}