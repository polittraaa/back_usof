export async function handleComment(req, res, db, Post) {
    const modulePost = new Post(db);
    const { post_id } = req.params;
    const { content } = req.body;
    
    try { 
        const role = req.userRole; // form middle
        const id = req.session?.userId; // for autor parameter
        console.log('in get post, role:', role)
        console.log('in get post, user:', id)

        const comment = await modulePost.new_comment(post_id, id, content);
        console.log(comment);
        res.json(comment);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Can not create a new comment' });
    }
}