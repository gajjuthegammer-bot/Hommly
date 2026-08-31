const express = require("express")
const router = express.Router()

const MyModel = require("../models/user")

router.post("/login", async (req, res) => {
    try {

        console.log(req.body);

        const { email, password } = req.body;

        const user = await MyModel.findOne({
            email: email,
            password: password
        });

        console.log(user);

        if (user) {
            res.json({
                status: true,
                data: user
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Invalid Email or Password"
            });
        }

    } catch(err) {
        console.log(err);
    }
});


router.post("/Ragistration", async(req, res) => {
    
    try {
        var data = await MyModel.create(req.body)
        res.status(200).json({
            status: "true"
        })
    }
    catch (err) {
        res.status(400).json({
            status: "false",
            err
        })
    }
})



module.exports = router