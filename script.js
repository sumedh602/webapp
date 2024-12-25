// Initialize the Google API client
function start() {
  gapi.auth2.init({
    client_id: '415055046402-p8abf4qu0va3188sq6gh3rp5slu46l1e.apps.googleusercontent.com', // Use your Google OAuth Client ID here
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  }).then(() => {
    // Handle success
    console.log("Google API initialized.");
  }).catch((error) => {
    // Handle error
    console.error("Google API initialization error:", error);
  });
}

// Google Sign-In Success handler
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("User signed in:");
  console.log("Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());

  // Hide login page and show app
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
  
  // Optional: You can add further actions like loading user data or saving it to a database
  // For example: Save user data to Firebase, show user contacts, etc.
}

// Load the Google API platform script
(function() {
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  document.body.appendChild(script);
})();

// Set up Firestore to connect to the emulator
if (window.location.hostname === "localhost") {
  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}
