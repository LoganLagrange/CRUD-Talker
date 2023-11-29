// REGISTRATION PAGE logic
const signupForm = document.getElementById(`signup-form`);
const signupUsername = document.getElementById(`signup-username`);
const signupName = document.getElementById(`signup-name`);
const signupEmail = document.getElementById(`signup-email`);
const signupPassword1 = document.getElementById(`signup-pword1`);
const signupPassword2 = document.getElementById(`signup-pword2`);

signupForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    if (signupPassword1.value !== signupPassword2.value) {
        // INSERT PAGE INTERACTION FOR PASSWORD MISMATCH
        console.log(`learn to spell, idiot`);
    }

    const newUser = {
        username: signupUsername.value,
        name: signupName.value,
        email: signupEmail.value,
        password1: signupPassword1.value,
        password2: signupPassword2.value
    }
    signup(newUser);
});

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
        console.log(res);
    }) .catch(err => {
        console.error(err);
    });

    loginFunc(signupUsername.value, signupPassword1.value);
}

// LOGIN PAGE logic
