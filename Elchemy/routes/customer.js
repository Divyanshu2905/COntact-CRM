const router=require("express").Router();
const {getDoc,getDocs, updateDoc, doc, deleteDoc,setDoc,collection } = require("firebase/firestore");
const db=require("../firebase");

router.post("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body;
        const userRef = doc(db, userId, req.body.email);
        const existingUserDoc = await getDoc(userRef);
        if(existingUserDoc.data()===undefined){
            await setDoc(userRef, updateData)
            res.status(200).json({ message: "Customer Added successfully." });
        }
        else{
            res.status(400).json({ message: "Customer With Same Email Exists Use Different Email." });
        }
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error Adding Customer" });
      }
})

router.put("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updateData = req.body;
        const userRef = doc(db, userId, req.body.email);
        await updateDoc(userRef, updateData)
        res.status(200).json({ message: "Customer updated successfully." });
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating Customer." });
      }
})

router.get("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(req.body);
        if ("email" in req.body) {
            const email=req.body.email;
            const CustomerDoc = await getDoc(doc(db, userId, email));
            if (CustomerDoc.exists) {
                const CustomerData = CustomerDoc.data();
                res.status(200).json(CustomerData);
            } else {
                res.status(404).json({ message: "Customer not found." });
            }
        }
        else{
            const customerdata = await getDocs(collection(db, userId));
            const arr = [];
            customerdata.forEach((doc) => {
                arr.push(doc.data());
            });
            res.status(200).json(arr);
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching Customer." });
    }
});

router.delete("/:userId/:customerId", async (req, res) => {
    try {
      console.log(req);
        const userId = req.params.userId;
        const email=req.params.customerId;
        const userRef = doc(db, userId,email);
        await deleteDoc(userRef);
        res.status(200).json({ message: "Customer deleted successfully." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting Customer." });
      }
  });

module.exports=router;
