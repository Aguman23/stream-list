const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } = require('firebase/auth');
const { initializeApp } = require ("firebase/app");
const { getFirestore } = require ("firebase/firestore");
const { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence } = require ("firebase/auth")

const firebaseConfig = {
  apiKey: "AIzaSyDCTJUsYuJozO0QZnqvCEGh0dNnbX1AX8M",
  authDomain: "stream-list-d9c07.firebaseapp.com",
  projectId: "stream-list-d9c07",
  storageBucket: "stream-list-d9c07.appspot.com",
  messagingSenderId: "45095951163",
  appId: "1:45095951163:web:99eb950cbd28a0c3aa351e",
  measurementId: "G-TBE6HK3TF8"
};

const app = initializeApp(firebaseConfig);

const auth= getAuth(app);

setPersistence(auth, browserSessionPersistence)
    .then(() => {
    })
    .catch((error) => {
        console.error(error);
    });

const googleProvider= new GoogleAuthProvider();
const db = getFirestore(app);

exports.login = functions.https.onRequest(async (req, res) => {
  const { email, password } = req.body;

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const options = {
      maxAge: 3600, 
      httpOnly: true, 
      secure: true, 
      sameSite: 'None', 
    };

    
    res.cookie('yourAuthCookie', 'cookieValue', options);

    res.status(200).json({ message: 'Logged in successfully', user: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.post('/googleSignIn', async (req, res) => {
  try {
    // Implement Google sign-in logic here
    // ...
    // Authenticate the user using Google sign-in
    const user = {/* User object after Google sign-in */};

    // Set cookies with the appropriate SameSite and Secure attributes
    const options = {
      maxAge: 3600, // Cookie expiration time in seconds
      httpOnly: true, // HTTP only, prevents JavaScript access
      secure: true, // Ensure the connection is secure (HTTPS)
      sameSite: 'None', // Allow cross-origin requests
    };

    // Set the authentication cookie
    res.cookie('yourAuthCookie', 'cookieValue', options);

    // Return a response or redirect as needed
    res.status(200).json({ message: 'Google Sign-In successful', user: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Google Sign-In failed' });
  }
});

app.post('/logout', async (req, res) => {
  try {
    // Implement logout logic here
    // ...

    // Clear the authentication cookie
    res.clearCookie('yourAuthCookie');

    // Return a response or redirect as needed
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Logout failed' });
  }
});