class Comment {
    constructor(db) {
        this.db = db
    }

    async find_by_id(comment_id) {
        return await this.db("comments").where({ comment_id }).first();
    }

    async get_likes(role, comment_id, user_id) {
        const base = this.db('likes as l')
            .join('comments as c', 'l.target_id', 'c.comment_id')
            .select(
                'l.like_id',
                'l.publish_date',
                'l.author_id as like_author',
                'l.like_type',
                'c.comment_id',
                'c.author_id as comment_author'
            ).where('c.comment_id', comment_id)
            .andWhere('l.target_type', 'comment');

        // if (role === 'admin') return base;
        // if (role === 'user') {
        //     return base.where(qb => {
        //         qb.where('c.author_id', user_id);
        //     });
        // }
        // return base.where('c.author_id', user_id);

        return base;
    }

    async get_role(id) {
        const role = await this.db('users')
        .where({user_id: id})
        .select('role')
        .first();
      return role;
    }
}

export default Comment;