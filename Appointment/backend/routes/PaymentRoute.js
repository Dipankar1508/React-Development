const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// POST /api/payments/create-order
router.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body; // in ₹

        if (!amount) {
            return res.status(400).json({ message: "Amount is required" });
        }

        const options = {
            amount: amount * 100, // ₹ -> paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            keyId: process.env.RAZORPAY_KEY_ID,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating Razorpay order" });
    }
});


module.exports = router;