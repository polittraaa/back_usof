async function getPosts(req, res, db, Post) {
    const modulePost = new Post(db);
    try{
        const posts  = await modulePost.get_posts();
        res.send(posts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get posts' });
    }
}
export default getPosts;