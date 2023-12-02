// LOGIN PAGE logic
const loginForm = document.getElementById(`login-form`);
const loginUsername = document.getElementById(`login-username`);
const loginPassword  = document.getElementById(`login-password`);
const loginWarning =  document.getElementById(`login-warning`);

// Event listener for login form
loginForm.addEventListener(`submit`, (e) =>  {
    e.preventDefault();
    // calls login function
    loginFunc(loginUsername.value, loginPassword.value);
})

// Login function
// issues post request to server to log user in (create session variables)
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
        // checks if server sent bad status code
        // rejects if it did to trigger catch block for error
        if(!res.ok) {
            if(res.status === 401) {
                return Promise.reject({status: 401, message: `Incorrect username or password!`})
            } else {
                return Promise.reject({status: res.status, message: `Unexpected error occurred!`})
            }
        }
        return res.json();
    }).then(res => {
        const userId = res.userId;
        const newUrl = `http://localhost:3000/`
        window.location.href = newUrl;
        sessionStorage.setItem(`userId`, userId);
    }) .catch(err => {
        // logs and displays error or bad status code
        console.error(err);
        loginWarning.textContent =  err.message;
    });
}