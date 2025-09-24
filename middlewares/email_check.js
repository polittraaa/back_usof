export function emailCheck(db, User){
  return async function (req, res, next) {
    const moduleUser = new User(db);
    const { email } = req.body;
    try{
      const state = await moduleUser.prof_email(email);
      if (state) next();
      else  res.status(403).json({error: "User must confirm email" });
    } catch (err) {
      console.error(err);
      res.status(500).json({error: "Server error" });
    }
  }
}