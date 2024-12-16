// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV5tsnlE0UkFIHiuhQUi1ZRouP_p0Ffi4",
  authDomain: "lumeoapp.firebaseapp.com",
  databaseURL: "https://lumeoapp.firebaseio.com",
  projectId: "lumeoapp",
  storageBucket: "lumeoapp.firebasestorage.app",
  messagingSenderId: "591544758369",
  appId: "1:591544758369:web:a226173af1f62577113a20",
  measurementId: "G-DKSB2YH1BE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google Login Functionality
function onSignIn(googleUser) {
const profile = googleUser.getBasicProfile();
console.log("User signed in:");
console.log("Name: " + profile.getName());
console.log("Email: " + profile.getEmail());

// Hide login page and show app
document.getElementById("loginPage").style.display = "none";
document.getElementById("appPage").style.display = "block";
}

// Google OAuth Initialization
function start() {
  gapi.auth2.init({
      client_id: '415055046402-p8abf4qu0va3188sq6gh3rp5slu46l1e.apps.googleusercontent.com', // Replace with your OAuth Client ID
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  });
}

// Logout Functionality
document.getElementById("logoutBtn")?.addEventListener("click", function () {
const auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
  console.log("User signed out.");
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("appPage").style.display = "none";
});
});

// Contact Management
let contacts = [];
document.getElementById("addContactBtn")?.addEventListener("click", function () {
const contactName = prompt("Enter contact name:");
if (contactName) {
  contacts.push(contactName);
  updateContacts();
}
});

function updateContacts() {
const contactsList = document.getElementById("contactsList");
contactsList.innerHTML = contacts.map(contact => `<li>${contact}</li>`).join("");
}

// Chat Functionality
document.getElementById("sendMessageBtn")?.addEventListener("click", function () {
const message = document.getElementById("messageInput").value;
if (message) {
  const chatWindow = document.getElementById("chatWindow");
  const newMessage = document.createElement("div");
  newMessage.classList.add("sent");
  newMessage.textContent = message;
  chatWindow.appendChild(newMessage);
  document.getElementById("messageInput").value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
});

// Additional Button Checks for Missing Elements
const sendAudioBtn = document.getElementById("sendAudioBtn");
if (sendAudioBtn) sendAudioBtn.addEventListener("click", () => alert("Audio Sent!"));

const sendImageBtn = document.getElementById("sendImageBtn");
if (sendImageBtn) sendImageBtn.addEventListener("click", () => alert("Image Sent!"));

const startVoiceCallBtn = document.getElementById("startVoiceCallBtn");
if (startVoiceCallBtn) startVoiceCallBtn.addEventListener("click", () => alert("Voice Call Started!"));

// Start Google OAuth Initialization when the page loads
window.onload = start;
