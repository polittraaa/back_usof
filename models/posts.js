class Post {
  constructor(db) {
    this.db = db;
  } 

  async get_posts(limit, offset, role, userId) {
    const query = this.db('posts');
    if (role === 'admin') {
      // no filter
    } else if (role === 'user') {
      query.where(qb =>
        qb.where('post_status', 'active').orWhere('author_id', userId)
      );
    } else {
      query.where({ post_status: 'active' });
    }
    return query.orderBy('publish_date', 'desc').limit(limit).offset(offset);
  }

  async count(role, userId) {
    const q = this.db('posts');
    if (role === 'guest') q.where('post_status', 'active');
    else if (role === 'user')
      q.where(qb =>
        qb.where('post_status', 'active').orWhere('author_id', userId)
      );
    const result = await q.count('* as total');
    return result[0].total;
  }

  async get_post(role, post_id, userId) {
    const base = this.db('posts').where('post_id', post_id);
    if (role === 'admin') return base.fist();
    return base 
      .andWhere(qb => 
        qb.where('post_status', 'active').orWhere('autor_id', userId)
      )
      .first();
  }
}
export default Post