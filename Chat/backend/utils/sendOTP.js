const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // 16-digit app password
    },
});
module.exports = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `"Huddle" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Your Huddle Login OTP",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4f46e5;">Your Huddle Login OTP</h2>
                <div style="background: #f8fafc; padding: 30px; text-align: center; border-radius: 12px;">
                    <h1 style="font-size: 48px; font-weight: bold; color: #4f46e5; margin: 0; letter-spacing: 8px;">${otp}</h1>
                    <p style="color: #64748b; margin-top: 20px;">Valid for 5 minutes</p>
                </div>
                <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
                    This OTP was requested for Huddle login. If you didn't request it, ignore this email.
                </p>
            </div>
            `
        });

        console.log("OTP sent to", email);
    } catch (err) {
        console.error("OTP FAILED:", err.message);
        throw err;
    }
};
