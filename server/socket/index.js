const Message = require('../db/models/message');
const Channel = require('../db/models/channel');
const { translateMsg } = require('./helperFunc/translate');
const {
  addUser,
  removeUser,
  getUser,
  getAllUsers,
} = require('./helperFunc/users');

module.exports = (io) => {
  io.on('connection', (socket, callback) => {
    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('join', ({ name, language }) => {
      const { error, user } = addUser({ id: socket.id, name, language });

      if (error) return callback(error);

      // socket.broadcast.emit('new-message', {
      //   author: { image: '/images/admin.png', name: 'admin', id: 1337 },
      //   authorId: 1337,
      //   content: `${user.name} is connected!`,
      //   channelId: 1,
      //   id: 1337,
      // });
    });

    socket.on('new-message', (message) => {
      const currentUser = getUser(socket.id);
      const allUsers = getAllUsers();
      let msgCopy = { ...message };

      allUsers.map(async (user) => {
        let language = user.language;
        const translatedMsg = await translateMsg(message.content, language);
        msgCopy.content =
          currentUser.id === user.id ? message.content : translatedMsg;

        io.to(`${user.id}`).emit('new-message', msgCopy);
      });
    });

    socket.on('new-channel', (channel) => {
      socket.broadcast.emit('new-channel', channel);
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      console.log('disconnected: ', user);
    });
  });
};
