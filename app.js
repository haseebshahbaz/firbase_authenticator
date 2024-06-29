// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuUwv7HsjAac_9yw1NSeJGcY9Io3lhhyA",
  authDomain: "fir-authenticator-9a8fc.firebaseapp.com",
  projectId: "fir-authenticator-9a8fc",
  storageBucket: "fir-authenticator-9a8fc.appspot.com",
  messagingSenderId: "269666909109",
  appId: "1:269666909109:web:60b702d94c1bc10b3177fc",
  measurementId: "G-X3F6FCT53M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to show error messages
function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
}

// Function to hide error messages
function hideError() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';
}

// Sign up function
window.signUp = function() {
  hideError();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log('User signed up:', userCredential.user);
      showUserProfile(userCredential.user);
    })
    .catch(error => {
      console.error('Error signing up:', error);
      if (error.code === 'auth/email-already-in-use') {
        showError('Email already in use. Please sign in.');
      } else {
        showError(error.message);
      }
    });
};

// Sign in function
window.signIn = function() {
  hideError();
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log('User signed in:', userCredential.user);
      showUserProfile(userCredential.user);
    })
    .catch(error => {
      console.error('Error signing in:', error);
      showError(error.message);
    });
};

// Sign out function
window.signOut = function() {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
      showAuthForm();
    })
    .catch(error => {
      console.error('Error signing out:', error);
      showError(error.message);
    });
};

// Function to show user profile
function showUserProfile(user) {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('user-container').style.display = 'block';
  document.getElementById('user-email').textContent = `Email: ${user.email}`;
}

// Function to show authentication form
function showAuthForm() {
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('user-container').style.display = 'none';
}

// Initially show the authentication form
showAuthForm();
