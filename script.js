// Initialize the Google API client
function start() {
  gapi.auth2.init({
    client_id: '415055046402-p8abf4qu0va3188sq6gh3rp5slu46l1e.apps.googleusercontent.com',  // Your OAuth client ID
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    redirect_uri: 'https://www.lumeoapp.com/oauth2/callback'
  }).then(() => {
    console.log("Google OAuth initialized successfully.");
  }).catch(error => {
    console.log('OAuth initialization error: ', error);
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
}

// Load the Google API platform script dynamically
(function() {
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  document.body.appendChild(script);
})();
