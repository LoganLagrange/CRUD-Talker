const loginFunc = require(`../../middleware/login`);

const signupForm = document.getElementById(`signup-form`);

function signup(newUserData){    
    const url = `http://${process.env.NODE_ENV}/api/users`;
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

module.exports = signup();