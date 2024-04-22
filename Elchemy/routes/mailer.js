const nodeMailer=require("nodemailer");
const router=require("express").Router();
const dotenv=require("dotenv");
dotenv.config();
router.post("/:userId", async (req, res) => {
    try {
        const email=req.body.email;
        const sender=req.body.name;
        const text=req.body.text;
        const subject=req.body.subject
        const transporter = nodeMailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "rhtwatts@gmail.com",
              pass: process.env.PASSWORD,
            },
          });
          const from='"'+sender+'"<rhtwatts@gmail.com>';
          var mailOptions = {
            from: from,
            to: email,
            subject: subject,
            text: text
          };
          await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.status(200).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending Email" });
    }
});

module.exports=router;
