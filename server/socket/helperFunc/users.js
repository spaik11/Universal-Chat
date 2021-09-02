const users = [];

module.exports = {
  addUser: ({ id, name, language }) => {
    const existingUser = users.find((user) => user.name === name);

    if (existingUser) return { error: 'Username is taken.' };

    if (!existingUser) {
      name = name.trim().toLowerCase();

      const user = { id, name, language };

      users.push(user);
      console.log(users);
      return { user };
    }
  },
  removeUser: (id) => {
    const index = users.find((user) => user.id === id);
    console.log('index', index);

    if (index !== undefined) return users.splice(users.indexOf(index), 1)[0];
  },
  getUser: (id) => {
    return users.find((user) => user.id === id);
  },
  getAllUsers: () => {
    return users;
  },
};
