async function handleDelete(req, res, User, db) {
    const { user_id } = req.params;
    const userModel = new User(db);
    try{
        await userModel.delete(user_id);
        res.status(200).json({ message: 'User deleted successfuly' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Could not delete user' });  
    }
};

export default handleDelete;