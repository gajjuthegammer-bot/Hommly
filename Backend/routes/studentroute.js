const express = require("express")
const router = express.Router()


const MyModel = require("../models/student")

router.post("/", async(req, res) => {
    
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


router.get("/:id", async (req, res) => {
    try {
        const data = await MyModel.findById(req.params.id);

        res.status(200).json({
            status: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            err
        });
    }
});
router.get("/", async (req, res) => {
    try {
        const data = await MyModel.find();

        res.status(200).json({
            status: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            err
        });
    }
});

router.delete("/:id", async(req, res) => {
    try {
      
       await MyModel.findByIdAndDelete(req.params.id)
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


router.patch("/:id", async(req, res) => {
    try {
      
       await MyModel.findByIdAndUpdate(req.params.id, req.body)
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
// router.post("/login", async (req, res) => {
//     try {

//         console.log(req.body);

//         const { email, password } = req.body;

//         const user = await MyModel.findOne({
//             email: email,
//             password: password
//         });

//         console.log(user);

//         if (user) {
//             res.json({
//                 status: true,
//                 data: user
//             });
//         } else {
//             res.status(401).json({
//                 status: false,
//                 message: "Invalid Email or Password"
//             });
//         }

//     } catch(err) {
//         console.log(err);
//     }
// });
// router.post("/Ragistration", async(req, res) => {
    
//     try {
//         var data = await MyModel.create(req.body)
//         res.status(200).json({
//             status: "true"
//         })
//     }
//     catch (err) {
//         res.status(400).json({
//             status: "false",
//             err
//         })
//     }
// })

module.exports = router