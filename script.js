// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV5tsnlE0UkFIHiuhQUi1ZRouP_p0Ffi4",
  authDomain: "lumeoapp.firebaseapp.com",
  projectId: "lumeoapp",
  storageBucket: "lumeoapp.firebasestorage.app",
  messagingSenderId: "591544758369",
  appId: "1:591544758369:web:a226173af1f62577113a20",
  measurementId: "G-DKSB2YH1BE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Google API client
function start() {
  gapi.auth2.init({
    client_id: '591544758369-9hsitg0viq1juoej6shge4co9uunj86g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    redirect_uri: 'https://www.lumeoapp.com/oauth2/callback'
  }).then(() => {
    console.log("Google OAuth initialized successfully.");
  }).catch(error => {
    console.error('OAuth initialization error: ', error);
  });
}

// Google Sign-In Success handler
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("User signed in:");
  console.log("Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());

  // Firebase authentication with Google
  const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);

  firebase.auth().signInWithCredential(credential)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Firebase user signed in:", user);

      // Hide login page and show app
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("appPage").style.display = "block";

      // Send a success message (optional, you can remove this if not needed)
      window.postMessage('user-signed-in', 'https://www.lumeoapp.com');
    }).catch((error) => {
      console.error('Firebase authentication error: ', error);
      alert('Authentication failed. Please try again.');
    });
}

// Google Sign-Out handler
function signOut() {
  firebase.auth().signOut().then(() => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log("User signed out.");
      document.getElementById("loginPage").style.display = "block";
      document.getElementById("appPage").style.display = "none";
    }).catch(error => {
      console.error("Error signing out from Google:", error);
    });
  }).catch(error => {
    console.error("Error signing out from Firebase:", error);
  });
}

// Load the Google API platform script dynamically
(function() {
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  script.onload = () => start(); // Start Google API client once the script is loaded
  document.body.appendChild(script);
})();

// Event listener for the message event
window.addEventListener('message', (event) => {
  // Ensure that the message is coming from the correct origin (your app)
  if (event.origin === 'https://www.lumeoapp.com') {
    if (event.data === 'user-signed-in') {
      console.log('User signed in successfully!');
      // Handle the login success
    }
  }
});
