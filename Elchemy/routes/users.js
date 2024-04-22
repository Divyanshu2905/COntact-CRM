const router=require("express").Router();
const {getDoc, doc } = require("firebase/firestore");
const db=require("../firebase");;

router.get("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists) {
        const userData = userDoc.data();
        res.status(200).json(userData);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user." });
    }
});

module.exports=router;
