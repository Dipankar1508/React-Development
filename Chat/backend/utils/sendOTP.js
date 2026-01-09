const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // 16-digit app password
    },
});

// module.exports = async (email, otp) => {
//     await transporter.sendMail({
//         from: "Huddle <no-reply@huddle.com>",
//         to: email,
//         subject: "Your Huddle Login OTP",
//         html: `
//             <p>Hello,</p>

//             <p>Your One-Time Password (OTP) for logging into <b>Huddle</b> is:</p>

//             <h2 style="letter-spacing:2px;">${otp}</h2>

//             <p>This OTP is valid for <b>5 minutes</b>.</p>

//             <p>Please do not share this OTP with anyone.</p>

//             <p>If you did not request this login, you can safely ignore this email.</p>

//             <br/>
//             <p>Thanks,<br/>Team Huddle</p>
//         `,
//     });
// };

module.exports = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `"Huddle" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Your Huddle Login OTP",
            html: `<h2>${otp}</h2>`
        });

        console.log("✅ OTP sent to", email);
    } catch (err) {
        console.error("❌ OTP FAILED:", err.message);
        throw err;
    }
};
