async function handleUpdate(req, res, db, User) {
   const { user_id } = req.param;
   const { full_name, email, login } = req.body;
   const moduleUser = new User(db);
 
    try{
        if ( full_name == undefined && email == undefined && login == undefined){
            res.status(500).json({message: 'Invalide change field'});
        }
        //funck update(field, value)
        await  moduleUser.update_user()
        const newUser = await db('users').where({ users_id: user_id  }).first();
        res.send(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export default handleUpdate;