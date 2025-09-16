async function handleUpdate(req, res, db, User) {
   const { user_id } = req.params;
   const moduleUser = new User(db);
   
   try{
        const { full_name, email, login } = req.body;
        const update = {};
        if (full_name !== undefined) update.full_name = full_name;
        if (email !== undefined) update.email = email; // handle email verif if changed 
        if (login !== undefined) update.login = login;
        
        if (Object.keys(update).length === 0) {
            res.status(500).json({message: 'No fields to update'});
        }

        //func update(field, value)
        await moduleUser.update_user(user_id, update)
        const newUser = await moduleUser.find_by_id(user_id);
        res.send(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export default handleUpdate;