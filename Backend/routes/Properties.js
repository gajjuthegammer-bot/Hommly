const express = require("express")
const router = express.Router()

const MyModel = require("../models/Properties")

router.post("/", async (req, res) => {
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
        var data = await MyModel.findById(req.params.id)
        // console.log(data)
        res.status(200).json({
            status: "true",
            data
        })
    }
    catch (err) {
        res.status(400).json({
            status: "false",
            err
        })
    }
})
 router.get("/", async (req, res) => {
    try {
        var data = await MyModel.find()
        // console.log(data)
        res.status(200).json({
            status: "true",
            data
        })
    }
    catch (err) {
        res.status(400).json({
            status: "false",
            err
        })
    }
})

router.delete("/:type", async (req, res) => {
    try {

        await MyModel.findOneAndDelete({ type: req.params.type })
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


router.patch("/:id", async (req, res) => {
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

module.exports = router