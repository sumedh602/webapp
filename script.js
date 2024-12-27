firebase.initializeApp(firebaseConfig);

function start() {
  gapi.auth2.init({
    client_id: '591544758369-9hsitg0viq1juoej6shge4co9uunj86g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    redirect_uri: 'https://www.lumeoapp.com/oauth2/callback'
  }).then(() => {
    console.log("Google OAuth initialized successfully.");
  }).catch(error => {
    console.log('OAuth initialization error: ', error);
  });
}

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("User signed in:");
  console.log("Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());

  const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
  
  firebase.auth().signInWithCredential(credential)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Firebase user signed in:", user);
      
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("appPage").style.display = "block";
    }).catch((error) => {
      console.log('Firebase authentication error: ', error);
    });
}

(function() {
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  document.body.appendChild(script);
})();

window.opener.postMessage('user-signed-in', 'https://www.lumeoapp.com');
window.close();

window.addEventListener('message', (event) => {
  if (event.origin === 'https://www.lumeoapp.com') {
    if (event.data === 'user-signed-in') {
      console.log('User signed in successfully!');
    }
  }
});
