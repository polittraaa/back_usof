class Cat {
  constructor(db) {
    this.db = db;
  }

  async get_cat() {
    const query = this.db('categories');
    return query;
  }
  
}
export default Cat