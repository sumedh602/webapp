// Initialize the Google API client using the newer google.accounts.id method
function start() {
  // Initialization is no longer necessary with google.accounts.id, we handle the button rendering and sign-in directly.
  console.log("Google API initialized.");
}

// Google Sign-In Success handler using the new API method
function handleCredentialResponse(response) {
  // Decode the JWT ID token
  console.log("Encoded JWT ID token: " + response.credential);

  // Decode the JWT to get user data
  const userData = jwt_decode(response.credential);
  console.log("User data:", userData);

  // Hide login page and show app
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";

  // You can use userData to populate user-related information in your app
  // For example: userData.name, userData.email, userData.picture
}

// Google Sign-Out handler
document.getElementById("logoutBtn").addEventListener("click", function () {
  // Sign the user out by clearing credentials
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("appPage").style.display = "none";
});

// Load Google OAuth client and sign-in button
window.onload = function() {
  // Initialize the Google Sign-In button
  google.accounts.id.initialize({
    client_id: "415055046402-p8abf4qu0va3188sq6gh3rp5slu46l1e.apps.googleusercontent.com", // Replace with your Client ID
    callback: handleCredentialResponse, // Your callback function
  });

  google.accounts.id.renderButton(
    document.getElementById("g_id_signin"),
    { theme: "outline", size: "large" } // Optional: customize button appearance
  );
};

// Optional: Add Firebase Firestore connection settings for local development
if (window.location.hostname === "localhost") {
  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}
