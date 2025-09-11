class User {
    constructor(db){
        this.db = db;
    }
    async find_user(email, login){
        const user = await this.db('users')
            .where({ email, login })
            .first();
        return(user);
    }

    async create_user(login, hash, name, email) {
        const [user_id] = await this.db('users').insert({
            login,
            password_hash: hash,
            full_name: name,
            email,
            picture: 'default.png',
            rating: 0,
            role: 'user',
            created_at: new Date(),
            is_email_confirmed: false
        })
        return user_id;
    }
    async update_pass(hashedPass, decoded) {
        await this.db('users').update(
          { password: hashedPass},
          { where: { email: decoded.email } }
        );
    } 
}
export default User