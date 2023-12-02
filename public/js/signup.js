// REGISTRATION PAGE logic
const signupForm = document.getElementById(`signup-form`);
const signupUsername = document.getElementById(`signup-username`);
const signupName = document.getElementById(`signup-name`);
const signupEmail = document.getElementById(`signup-email`);
const signupPassword1 = document.getElementById(`signup-pword1`);
const signupPassword2 = document.getElementById(`signup-pword2`);
const signupWarning = document.getElementById("signup-warning");

signupForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    signupWarning.textContent = ``;
    if (signupPassword1.value !== signupPassword2.value) {
        // INSERT PAGE INTERACTION FOR PASSWORD MISMATCH
        signupWarning.textContent = `Passwords do not match, please try again.`
        return;
    }

    const newUser = {
        username: signupUsername.value,
        name: signupName.value,
        email: signupEmail.value,
        password1: signupPassword1.value,
        password2: signupPassword2.value
    }

    let isUsernameTaken
    // signupAuth(newUser);
    const url = `http://localhost:3000/api/users`;
    fetch(url, {
        method: `GET`,
        headers: {
            "Content-Type": "application/json",
        },
        
    }).then(res => res.json())
    .then(res => {
        res.forEach(item => {
            if(item.username === newUser.username) {
                signupWarning.textContent = `That username is taken! Please select another.`
                isUsernameTaken = true;
            } 
        });
        if(!isUsernameTaken) {
            signup(newUser);
        }
    }) .catch(err => {
        console.error(err);
    });
    // signup(newUser);
});

function signupAuth(newUser) {
    const url = `http://localhost:3000/api/users`;
    fetch(url, {
        method: `GET`,
        headers: {
            "Content-Type": "application/json",
        },
        
    }).then(res => res.json())
    .then(res => {
        res.forEach(item => {
            if(item.username === newUser.username) {
                signupWarning.textContent = `That username is taken! Please select another.`
                return;
            } 
        });
    }) .catch(err => {
        console.error(err);
    });
}

function signup(newUserData){    
    const url = `http://localhost:3000/api/users`;
    const newUser = {
        username:newUserData.username,
        email:newUserData.email,
        password:newUserData.password1,
        name:newUserData.name
    }
    fetch(url, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    }).then(res => res.json())
    .then(res => {
        loginFunc(signupUsername.value, signupPassword1.value);
    }) .catch(err => {
        console.error(err);
    });

//     loginFunc(signupUsername.value, signupPassword1.value);
}

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
    }).then(res => res.json())
    .then(res => {
        const newUrl = `http://localhost:3000/`
        window.location.href = newUrl;
    }) .catch(err => {
        console.error(err);
    });

    
}