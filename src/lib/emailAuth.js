import * as auth from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

/**
 * Handles the sign in button press.
 */
function toggleSignIn(authApp, email, password) {
  let inputValidation;
  if (auth.currentUser) {
    auth.signOut(authApp);
  } else {
    // Sign in with email and pass.
    auth
      .signInWithEmailAndPassword(authApp, email, password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          inputValidation = "Contraseña Errónea.";
        } else {
          inputValidation = errorMessage;
        }
        console.log(error);
      });
  }
  document
    .getElementById("password-reset")
    .addEventListener("click", () => sendPasswordReset(authApp, email));
  return inputValidation;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp(authApp, email, password) {
  let verification = false;
  // Create user with email and pass.
  auth
    .createUserWithEmailAndPassword(authApp, email, password)
    .then((cred) => {
      console.log("Usuario registrado con éxito", cred.user);
      verification = sendVerification(cred.user);
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("Esta contraseña es muy insegura");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  return verification;
}

/**
 * Send an email verification to the user.
 */
function sendVerification(user) {
  auth
    .sendEmailVerification(user)
    .then(function () {
      // Email Verification sent!
      alert("Email Verification Sent!");
      return user.emailVerified;
    })
    .catch((error) => {
      console.log("Error sending email verification:", error);
    });
}

/**
 *
 * @param {*} authApp
 * @param {*} email
 */
function sendPasswordReset(authApp, email) {
  auth
    .sendPasswordResetEmail(authApp, email)
    .then(function () {
      // Password Reset Email Sent!
      alert("Password Reset Email Sent!");
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        alert(errorMessage);
      } else if (errorCode == "auth/user-not-found") {
        alert(errorMessage);
      }
      console.log(error);
    });
}

/**
 * initApp handles:
 *  - onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  auth.onAuthStateChanged(authApp, function (user) {
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
    }
  });
}

export { toggleSignIn, handleSignUp };
