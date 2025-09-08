async function handleRegister(req, res, database, bcrypt) {
   const {email, login, password, password_confirmation, name} = req.body;
    
    try{
        if(password != password_confirmation){
            res.status(500).json({ error: 'passwords must match' });
        }
        const hash = await bcrypt.hash(password, saltRounds);
        
        const [user_id] = await database('users').insert({
            login,
            password_hash: hash,
            full_name: name,
            email,
            picture: 'default.png',
            rating: 0,
            role: 'user',
            created_at: new Date(),
            is_email_confirmed: false
        });

        const newUser = await database('users').where({ user_id }).first();
        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export default handleRegister;