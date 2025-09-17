export function roleCheck(db, User) {
  return async function (req, res, next) {
    try {
      if (req.session && req.session.userId) {
        const moduleUser = new User(db); 
        const role = await moduleUser.get_role(req.session.userId);
        req.userRole = role; // save role   
      }
      else {
        req.userRole = 'guest';
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({error: "Server error" });
    }
  }
}