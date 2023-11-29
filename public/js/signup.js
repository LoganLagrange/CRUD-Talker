const loginFunc = require(`../../middleware/login`);

const signupForm = document.getElementById(`signup-form`);

signupForm.addEventListener(`submit`, (e) => {
    e.preventDefault();

    
    if (signupPassword1.value !== signupPassword2.value) {
        // INSERT PAGE INTERACTION FOR PASSWORD MISMATCH
        console.log(`learn to spell, idiot`);
    }

    const url = `http://${process.env.NODE_ENV}/api/users`;
    const newUser = {
        username:signupUsername.value,
        email:signupEmail.value,
        password:signupPassword1.value,
        name:signupName.value
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
})