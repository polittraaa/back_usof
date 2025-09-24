export async function handleUpdatePost(req, res, db, Post) {
   const { post_id } = req.params;
    const modulePost = new Post(db);
   try{

        const { title, post_status, content, image_url, category } = req.body;
        const update = {};
        if (title !== undefined) update.title = title;
        if (post_status !== undefined) update.post_status = post_status;
        if (content !== undefined) update.content = content;
        if (image_url !== undefined) update.image_url = image_url;
        if (category !== undefined) update.category = category;
        
        if (Object.keys(update).length === 0) {
            res.status(500).json({message: 'No fields to update'});
        }

        //func update(field, value)
        await modulePost.update_post(post_id, update)
        const newPost = await modulePost.get_post(post_id);
        res.send(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update post' });
    }
};