class Post {
    constructor(db) {
        this.db = db;
    }
    
    async get_posts(limit, offset) {
        return await this.db('posts')
        .orderBy('publish_date', 'desc')
        .limit(limit)
        .offset(offset);
    }
    async find_post(id, data){
        return await this.db('posts')
            .where({ id, data })
            .first();
    }
}
export default Post