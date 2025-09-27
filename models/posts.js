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
    const base = this.db('posts');
    if (role === 'admin') return base.where('post_id', post_id).first();
    if (role === 'user') {
      return base
        .where(qb => {
          qb.where({ post_id })
            .andWhere('post_status', 'active');
      })
      .orWhere(qb => {
        qb.where({ post_id })
          .andWhere('author_id', userId);
      })
      .first();
    }
    return base.where('post_id', post_id).where({post_status: 'active'}).first();
  }

   async get_role(id) {
        const role = await this.db('users')
        .where({user_id: id})
        .select('role')
        .first();
      return role;
    }
    async get_author(post_id) {
        const author = await this.db('posts')
        .where({post_id})
        .select('author_id')
        .first();
      return author;
    }

    async get_comments(role, post_id, user_id) {
      const base =  this.db('comments as c')
      .join('posts as p', 'c.to_post_id', 'p.post_id')
      .select(
         'c.comment_id',
         'c.content',
         'c.publish_date',
         'c.author_id as comment_author',
         'p.post_id',
         'p.post_status',
         'p.author_id as post_author'
      )
      .where('c.to_post_id', post_id)
      .orderBy('publish_date', 'desc');

      if (role === 'admin') return base;
      if (role === 'user') {
        return base
        .where(qb => {
          qb.where('p.post_status', 'active')
            .orWhere('p.author_id', user_id);
      });
    }
    return base.where('p.post_status', 'active');
  }

  async new_comment(post_id, id, content) {
    const [comment_id] = await this.db('comments').insert({
      author_id: id,
      publish_date: new Date(),
      content: content,
      to_post_id: post_id,
      parent_id: null
    });
    const comment = await this.db('comments')
    .where({ comment_id })
    .first();
    return comment;
  }

  async get_category(post_id) {
    const cat = await this.db('categories as c')
    .join('post_categories as pc', 'c.category_id', 'pc.category_id')
    .where({'pc.post_id': post_id})
    .select('c.*');
    return cat;
  }

  async get_likes(role, post_id, user_id) {
      const base = this.db('likes as l')
      .join('posts as p', 'l.target_id', 'p.post_id')
      .select(
        'l.like_id',
        'l.publish_date',
        'l.author_id as like_author',
        'l.like_type',
        'p.post_id',
        'p.post_status',
        'p.author_id as post_author'
      ).where('p.post_id', post_id);

    if (role === 'admin') return base;
    if (role === 'user') {
      return base.where(qb => {
        qb.where('p.post_status', 'active')
          .orWhere('p.author_id', user_id);
      });
    }
    return base.where('p.post_status', 'active');
  }

  async new_post(title, content, categoryNames, id) {
    return this.db.transaction(async trx => {
      // Find cat IDs
      let category_ids = [];
  
      if (Array.isArray(categoryNames) && categoryNames.length > 0) {
        const rows = await trx('categories')
          .whereIn('title', categoryNames)
          .select('category_id');

        category_ids = rows.map(row => row.category_id);
        // console.log("Matched category IDs:", category_ids);
      }

      // Insert post
      const [post_id] = await trx('posts').insert({
        author_id: id,
        title,
        post_status: 'active',
        content,
        publish_date: new Date()
      });

      let join_rows = [];
      // Add into post_categories
      if (category_ids.length > 0) {
        join_rows = category_ids.map(category_id => ({
          post_id,
          category_id
        }));
        await trx('post_categories').insert(join_rows);
      }

      // 4. Get full post
      const post = await trx('posts')
        .where({ post_id })
        .first();

      return { post, join_rows };
    });
  }

  async new_like(post_id, id, like_type){
     const [like_id] = await this.db('likes').insert({
      author_id: id,
      target_id: post_id,
      publish_date: new Date(),
      like_type
    });
    const like = await this.db('likes')
    .where({ like_id })
    .first();
    return like;
  }

  async update_post(post_id, updates){
    const { category, ...post_updates } = updates;

    if (Object.keys(post_updates).length > 0){
      await this.db('posts')
        .where({ post_id })
        .update(post_updates);
    }
    if (category !== undefined ){
        await this.db('post_categories')
        .where({ post_id })
        .del();

      await this.db('post_categories').insert({
        post_id,
        category_id: category
      });
    }
  }

  async del_post(role, id, post_id) {
    if (role === 'admin') {
      return this.db('posts')
      .where({ post_id })
      .del();
    }  
    if (role === 'user') {
      return  this.db('posts')
      .where({ post_id, author_id: id })
      .del();
    }
    return 0;
  }

  async del_like(role, id, post_id) {
    if (role === 'admin') {
      return this.db('likes')
      .where({ target_id: post_id })
      .del();
    }  
    if (role === 'user') {
      return  this.db('likes')
      .where({ target_id: post_id, author_id: id })
      .del();
    }
    return 0;
  }
}
export default Post