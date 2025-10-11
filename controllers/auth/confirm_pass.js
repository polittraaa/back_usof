async function handleConfirm(req, res, db, jwt, bcrypt, User) {
const { confirm_token } = req.params;
const { new_pass } = req.body;
const SECRET = process.env.TOKEN_SECRET;

    try {
        const decoded = jwt.verify(confirm_token, SECRET);
        const hashedPass = await bcrypt.hash(new_pass, 10);
        const user = new User(db);
        await user.update_pass(hashedPass, decoded);
        res.send("Password has been reset successfully");
    
    }catch (err){
        console.error("Error resetting password:", err);
        res.status(401).send('Invalid or expired token');
    }
}

export default handleConfirm;