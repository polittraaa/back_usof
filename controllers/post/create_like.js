export async function handleLikes(req, res, db, Post) {
    const modulePost = new Post(db);
    const { post_id } = req.params;
    const { type } = req.body;
    
    try { 
        // const role = req.userRole; 
        const id = req.session?.userId;

        const like = await modulePost.new_like(post_id, id, type);// type aditional
        res.json(like);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Can not like' });
    }
}