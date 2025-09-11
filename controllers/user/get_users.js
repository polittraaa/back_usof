async function getUsers(req, res) {
    res.send(database('users'));
}
export default getUsers;