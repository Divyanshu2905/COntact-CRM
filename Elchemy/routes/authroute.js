const router=require("express").Router();
const { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification } = require("firebase/auth")
const { setDoc, doc } = require("firebase/firestore");
const db=require('../firebase');
const auth = getAuth();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId=user.uid;
    const userRef = doc(db, "users", userId);
    await sendEmailVerification(user);
    await setDoc(userRef, {
        name,
        email
    });
    res.status(201).json({ message: "User created successfully. Please check your email to verify." });
  } catch (error) {
    console.error(error);
    let errorMessage = "Registration failed.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email already in use.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password is too weak.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email format.";
    }
    res.status(400).json({ message: errorMessage });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user.emailVerified) {
      res.status(200).json({ message: "Login successful.", user });
    } else {
      sendEmailVerification(user);
      res.status(403).json({ message: "Email not verified. Please check your email." });
    }
  } catch (error) {
    console.error(error);
    let errorMessage = "Login failed.";
    if (error.code === "auth/wrong-password") {
      errorMessage = "Invalid email or password.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "Email not found.";
    }
    res.status(401).json({ message: errorMessage });
  }
});

module.exports=router;