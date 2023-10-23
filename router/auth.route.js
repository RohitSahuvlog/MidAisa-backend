const router = require("express");
const bcrypt = require("bcryptjs");
const authroute = router();
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/user.models");
const query = require("../models/enquiry.model");
const nodemailer = require("nodemailer");
const queryModel = require("../models/enquiry.model");


authroute.post("/signin", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const existingUser = await AdminUser.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new AdminUser({
            email,
            password: hashedPassword
        });
        await user.save()

        res.status(201).send({ message: "Admin created" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

authroute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await AdminUser.findOne({
            email
        });
        if (!user) {
            return res.status(401).send({ message: "Authentication failed" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Authentication failed" });
        }

        const token = jwt.sign({ userId: user._id, email: email, role: user.role }, process.env.JWT_SECRET);

        return res.status(200).send({
            message: "Login Successfully",
            token
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});


authroute.post("/feedback", async (req, res) => {
    try {
        const { message } = req.body;
        const querysave = new query({
            message
        });
        await querysave.save();
        res.status(200).send({
            message: "Feedback sent successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" });
    }
});

authroute.get("/feedback", async (req, res) => {
    try {
        const queries = await queryModel.find().sort({ create_at: -1 });
        console.log(queries)
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


authroute.post("/forgot-password", async (req, res) => {
    const { email } = req.body

    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'seth.bechtelar21@ethereal.email',
            pass: 'vDBgMRpgQRX8bUdQzM'
        },
    });

    const otpCode = generateOTP();
    let updatedUser = await User.findOneAndUpdate(
        { email },
        { otp: otpCode, checkotp: false },
        { new: true }
    );
    if (!updatedUser) {
        return res.status(400).send({ message: "Admin does not exist" });
    }
    // Create the email content with the OTP code
    const emailContent = `
            <h2>Your OTP Code: ${otpCode}</h2>
            <p>Please use this code to verify your email address.</p>
        `;

    // Send the email with the OTP code
    const info = await transporter.sendMail({
        from: 'sahu86744@gmail.com',
        to: email,
        subject: 'OTP Verification',
        html: emailContent,
    });


    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: 'Password reset link sent successfully' });
});

authroute.post("/resetpassword", async (req, res) => {
    const { email, password, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Email does not exist" });
        }

        if (user.otp !== otp) {
            return res.status(402).json({ message: "Invalid OTP" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.otp = "";

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



function generateOTP() {
    const digits = '0123456789';
    let OTP = '';

    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
}


module.exports = {
    authroute
};
