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

  async get_post(role, userId, post_id) {
    const base = this.db('posts').where('post_id', post_id);
    if (role === 'admin') return base.first();
    else if (role === 'user') {
      return base.andWhere(qb => 
        qb.where('post_status', 'active').orWhere('author_id', userId)
      )
      .first();
    }
    else {
      return base.where({post_status: 'active'}).first();
    }
  }

   async get_role(id) {
        const role = await this.db('users')
        .where({user_id: id})
        .select('role')
        .first();
        return(role);
    }
    async get_comments(post_id) {
      const comments = await this.db('comments')
      .where({to_post_id: post_id})
      .orderBy('publish_date', 'desc')
      return(comments)
    }
}
export default Post