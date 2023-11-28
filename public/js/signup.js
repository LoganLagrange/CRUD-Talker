const signupForm = document.getElementById(`signup-form`);

signupForm.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const signupUsername = document.getElementById(`signup-username`);
    const signupName = document.getElementById(`signup-name`);
    const signupEmail = document.getElementById(`signup-email`);
    const signupPassword1 = document.getElementById(`signup-pword1`);
    const signupPassword2 = document.getElementById(`signup-pword2`);

    if (signupPassword1.value !== signupPassword2.value) {
        console.log(`learn to spell, idiot`);
    }

    const url = `localhost:3000/api/users`
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


})