const express = require("express")
const app = express()
const cors = require("cors");
app.use(cors());
app.use(express.json())
const dbconnect = require("./config/dbconnect")
const studentroute = require("./routes/studentroute")
const productroute = require("./routes/productroute")
const userLogin = require("./routes/userLogin")
const users = require("./routes/users")
const Properties = require("./routes/Properties");
const Contact = require("./routes/Contact");

    dbconnect().then(() => console.log('Connected!'));

app.use("/student" , studentroute)
app.use("/product" , productroute)
app.use("/" , userLogin)
app.use("/profile" , users)
app.use("/properties" , Properties)
app.use("/Contact" , Contact)



app.listen(3030, () => {
    console.log("Server is running in port 3030");
})

