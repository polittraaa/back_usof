import User from "../../models/user.js";

async function handleConfirm(req, res, db, jwt) {
const { token } = req.params;
const { newPass } = req.body;
const SECRET = process.env.TOKEN_SECRET;

    try {
        const decoded = jwt.verify(token, SECRET);
        const hashedPass = await bcrypt.hash(newPass, 10);
        const user = new User(db);
        await user.udate_pass(hashedPass, decoded)
        res.send("Password has been reset successfully");
    
    }catch (err){
        console.error("Error resetting password:", err);
        res.status(401).send('Invalid or expired token');
    }
}

export default handleConfirm;