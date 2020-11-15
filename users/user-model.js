const db = require('../database/dbConfig.js');

module.exports = {
    getUsers,
    addUser,
    getUserBy,
}

function getUsers() {
    return db('users');
}
function addUser(user) {
    return db('users')
        .insert(user)
        // .then(newProject => getProjectsByID(newProject[0].id));
}
function getUserBy(value) {
    return db('users')
        .where(value)
        .first();
}