const express=require("express");
const app=express();
app.use(express.json());
const authRoute=require("./routes/authroute");
const userRoute=require("./routes/users");
//const crRoute=require("./routes/crm");
const customerRoute=require("./routes/customer");
const mailerRoute=require("./routes/mailer");
const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/auth",authRoute);
app.use("/users",userRoute);
app.use("/customers",customerRoute);
app.use("/mail",mailerRoute);
//pp.use("/crm",crRoute);


app.listen(5000,()=>{
    console.log("server running")
})