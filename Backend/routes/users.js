const express = require("express");
const router = express.Router();

const MyModel = require("../models/user");

router.get("/:id", async (req, res) => {
    try {
        const data = await MyModel.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            data
        });

    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Invalid user ID"
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const data = await MyModel.findByIdAndUpdate(req.params.id,req.body);

        if (!data) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            data
        });

    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Invalid user ID"
        });
    }
});
router.patch("/:id/password", async (req, res) => {
    try {
        const data = await MyModel.findByIdAndUpdate(req.params.id,req.body);

        if (!data) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            data
        });

    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Invalid user ID"
        });
    }
});
module.exports = router;