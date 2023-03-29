import { ROUTER } from "./router/router.js";
import { paths } from "./router/routes.js";
import { toggleSignIn, handleSignUp } from "./lib/barrel.js";
import authApp from "./lib/barrel.js";

/**
 *
 */
function scrollFunction() {
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("logo");
  if (navbar && logo) {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      navbar.style.padding = "30px 10px";
      logo.style.fontSize = "25px";
    } else {
      navbar.style.padding = "80px 10px";
      logo.style.fontSize = "35px";
    }
  }
}

// Scroll just show with home and about view
document.addEventListener("DOMContentLoaded", function () {
  const homeView = document.getElementById("main");
  const aboutView = document.getElementById("about");

  if (homeView || aboutView) {
    scrollFunction();
  }
});

/**
 * Detect elements from views DOM with ID
 */
/* function detectElement(elementID) {
  const element = document.getElementById(elementID);
  let detected = false;
  console.log("42");
  if (element) {
    console.log("elemento detectado 43");
    detected = true;
  }
  return detected;
} */

/**
 *
 */
function initializeRouter() {
  const Router = new ROUTER(paths);
  Router.load("home");

  let userData;
  const passwordInput = document.getElementById("password");

  const signInHandler = () => {
    Router.loadBody("signIn");
    document.getElementById("formSignIn").addEventListener("input", () => {
      userData = enableButtons("sign-in");
    });
    document.getElementById("sign-in").addEventListener("click", () => {
      const errorMsg = toggleSignIn(authApp, userData[0], userData[1]);
      if (errorMsg !== "") {
        passwordInput.setCustomValidity(errorMsg);
      } else {
        Router.loadBody("feed");
      }
    });
  };
  const signUpHandler = () => {
    Router.loadBody("signUp");
    document.getElementById("formSignUp").addEventListener("input", () => {
      userData = enableButtons("sign-up");
    });
    //FIXME:  Agregar fn async a todos lo q requieran
     console.log("userdata: " + userdata);
    document.getElementById("sign-up").addEventListener("click", () => {
      Router.loadBody("feed");
      const emailIgm = document.createElement("img");
      emailIgm.src = "./images/emailVerification.png";
      emailIgm.className = "emailImg";
      const main = document.getElementById("feed");
      main.replaceWith(emailIgm);
      console.log("email lista: " + userData[0]);
      console.log("email lista: " + userData[1]);

      if (handleSignUp(authApp, userData[0], userData[1])) {
        Router.loadBody("feed");
      }
    });
  };

  const aboutHandler = () => {
    Router.load("about");
  };

  document.getElementById("signIn").addEventListener("click", signInHandler);
  document.getElementById("signUp").addEventListener("click", signUpHandler);
  document.getElementById("signUp2").addEventListener("click", signUpHandler);
  document.getElementById("about").addEventListener("click", aboutHandler);
}

/**
 * Validate email input structure
 * @param {*} email
 * @returns boolean
 */
function validateEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

/**
 * Validate password input structure
 * @param {*} password
 * @returns boolean
 */
function validatePassword(password) {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  return regexPassword.test(password);
}

/**
 *
 * @param {*} input
 * @returns
 */
function validateInput(input, type) {
  const Inputvalue = input.value;
  let valid = true;
  if (type === "email") {
    console.log("emailValue: " +Inputvalue);
    if (validateEmail(Inputvalue)){
      return;
    } else {
      input.setCustomValidity(
        "Por favor, ingresa un correo electrónico válido"
      );
      valid = false;
    }
  } else if (type === "pass") {
    console.log("PassValue: " + Inputvalue);
    if (validatePassword(Inputvalue)){
      return;
    } else {
      input.setCustomValidity("Por favor, ingresa una contraseña válida");
      valid = false;
    }
  }
  return valid;
}

/**
 * Allow user see their password
 * @returns boolean
 */
function showPassword() {
  const showPasswordCheckbox = document.getElementById("showPassword");
  const password = document.getElementById("password");

  showPasswordCheckbox.addEventListener("change", () => {
    if (showPasswordCheckbox.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  });
  // For tests
  return showPasswordCheckbox.checked;
}

/**
 * Change button attribute to disable
 * @param {*} idElement
 * @returns
 */
function enableButtons(idElement) {
  const elementButton = document.getElementById(idElement);
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  showPassword();
  if (elementButton) {
    validateInput(emailInput, "email");
    validateInput(passwordInput, "pass");
  } 
  return emailInput.value, passwordInput.value;
}

initializeRouter();
