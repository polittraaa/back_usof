export function autorCheck(db, Post) {
  return async function (req, res, next) {
    const { post_id } = req.params; 
    try {
      if (req.session && req.session.userId) {
        const modulePost = new Post(db); 
        const author = await modulePost.get_author(post_id);
        if (req.session.userId === author.author_id) return next();

        return res.status(400).json({error: "Access denied" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({error: "Server error" });
    }
  }
}