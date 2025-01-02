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

// Dynamically load JWT Decode library if needed
(function () {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/jwt-decode";
  script.onload = () => {
    console.log('JWT Decode library loaded successfully.');
  };
  document.body.appendChild(script);
})();

// Handle GIS sign-in response
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token:", response.credential);

  // Wait for the jwt-decode library to be available
  if (typeof jwt_decode !== "undefined") {
    try {
      // Decode JWT token
      const userData = jwt_decode(response.credential);
      console.log("Decoded User Data:", userData);
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  } else {
    console.error("jwt_decode is not available.");
  }

  // Firebase authentication with Google
  const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);

  firebase.auth().signInWithCredential(credential)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Firebase user signed in:", user);

      // Hide login page and show app page
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("appPage").style.display = "block";
    })
    .catch((error) => {
      console.error("Firebase authentication error:", error);
    });
}

// Event listener for logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  firebase.auth().signOut()
    .then(() => {
      console.log("User signed out.");
      document.getElementById("loginPage").style.display = "block";
      document.getElementById("appPage").style.display = "none";
    })
    .catch((error) => {
      console.error("Sign-out error:", error);
    });
});

// Message event listener for inter-app communication
window.addEventListener("message", (event) => {
  if (event.origin === "https://www.lumeoapp.com") {
    if (event.data === "user-signed-in") {
      console.log("User signed in successfully!");
    }
  }
});
