// When the user clicks "Sign up instead", the sign up from displays
const signupDisplay = document.getElementById("login").getElementsByTagName("a");
signupDisplay.addEventListener("click", () => {
    console.log("signupdisplay", signupDisplay)
    // hide login form and display signup form
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
})


// When the user clicks "Login instead", the login form displays
const loginDisplay = document.getElementById("signup").getElementsByTagName("a");
signupDisplay.addEventListener("click", () => {
    // hide signup form and display login form
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
})
