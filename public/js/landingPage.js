const landingPageSignup = document.getElementById(`landing-page-signup`);
const landingPageLogin = document.getElementById(`landing-page-login`);

landingPageSignup.addEventListener(`click`, signupRedirect)

function signupRedirect(){
    const url = `http://localhost:3000/registration`
    window.location.href = url;
}