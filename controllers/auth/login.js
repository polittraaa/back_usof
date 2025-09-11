// /login --> post = success/fail
import User from "../../models/user.js";

async function handleLogin(req, res, db, bcrypt) {
    const { email, login, password } = req.body;
    const userModel = new User(db);
    
    try{
        const user = await userModel.find_user(email, login);

        if (!user) {
            return res.status(400).json({ error: 'Invalid email/login or password' });
        }

        if (user) {
            const match  = await bcrypt.compare(password, user.password_hash);
            if (!match) {
                 return res.status(400).json({ error: 'Invalid email/login or password' });
            }
            req.session.userId = user.id;
            req.session.visited = true;
        
            res.status(200).json({
                message: 'Login successful',
                user: { id: user.id, login: user.login, email: user.email, role: user.role }
            });
        }
    } catch(err){
        console.error(err);
        res.status(500).json({ error: 'Database error' })
    }
};

export default handleLogin;