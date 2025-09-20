export async function getPosts(req, res, db, Post) {
  const modulePost = new Post(db);
  try {
    const page = 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    
    const role = req.userRole; // form middle
    const id = req.session?.userId; // for autor parameter
    console.log('in get posts', req.userRole)
    console.log('in get post',id)
    
    const posts = await modulePost.get_posts(limit, offset, role, id);
    const total = await modulePost.count(role, id); // can implement diff count for roles 
    const page_count = Math.ceil(total / limit);
    
    res.json({page, page_count, posts});
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get posts' });
  }
}