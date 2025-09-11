import nodemailer from "nodemailer";

async function handleReset(req, res, jwt) {
    const { email } = req.body;
    const SECRET = process.env.TOKEN_SECRET;
    const PORT = process.env.SERVER_PORT;
    try{
        const token = jwt.sign({email}, SECRET, {expiresIn: "20m"});
        const link = `http://localhost:${PORT}/api/auth/password-reset/${token}`
        sendEmail(email, link);
        res.send("Email is sent");
    }catch(err) {
          console.error("❌ Detailed error:", err);
        res.status(500).json({ 
        error: "Email could not be sent. Please try again later." 
    });
    }
}

async function sendEmail(email, link) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
        }
    });
    const mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: 'Changing the pass ',
            text: `Clik the link to change the password ${link}`
        };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
}
export default handleReset;