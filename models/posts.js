class Post {
  constructor(db) {
    this.db = db;
  } 
  async get_posts(limit, offset, role, id) {
    if (role === 'admin') {
      return this.db('posts')
        .orderBy('publish_date', 'desc')
        .limit(limit)
        .offset(offset);
    } else if (role === 'user') {
      return this.db('posts')
        .where('post_status','active').orWhere('author_id', id)
        .orderBy('publish_date', 'desc')
        .limit(limit)
        .offset(offset);
    } else {
      return this.db('posts')
        .where({ post_status: 'active'})
        .orderBy('publish_date', 'desc')
        .limit(limit)
        .offset(offset);
    } 
  }
  async count() { 
    const result = await this.db('posts').count('* as total');
    return result[0].total;
  }
  async get_post(role, post_id, id) {
    return await this.db('posts')
      .where({ 
        post_id: post_id,
        post_status: 'active'
      }).orWhere({
        post_id: post_id,
        role: role == admin
      }).orWhere({
        post_id: post_id,
        'author_id': id
      })
      .first();
  }
}
export default Post