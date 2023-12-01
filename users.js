let users = [];

function addUser(id, username) {
  let user = { id: id, username: username };
  users.push(user);

  return user;
}

function getUser(id) {
  console.log(users);
  return users.find((u) => u.id == id);
}

module.exports = { addUser, getUser };
