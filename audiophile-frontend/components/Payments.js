import Razorpay from "razorpay";

export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_ID,
    key_secret: process.env.RAZORPAY_API_SECRET,
})