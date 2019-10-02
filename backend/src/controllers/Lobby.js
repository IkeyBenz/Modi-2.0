const router = require('express').Router();
const { io } = require('../index');


class Lobby {
  constructor(id) {
    this.id = id;
    this.users = {};
    this.broadcast = io.of(`/lobbies/${id}`);

    this.broadcast.on('connection', (socket) => {
      socket.on('disconnect', () => {
        this.removeUser(socket.id);
      });
      socket.on('join-attempt', (username) => {
        this.addUser(socket.id, username);
      });
    });
  }

  addUser(userId, name) {
    !this.creator && (this.creator = userId);
    this.users[userId] = name;
    this.broadcast.emit('updated-lobby', Object.values(this.users));
  }

  removeUser(userId) {
    delete this.users[userId];
    this.broadcast.emit('updated-lobby', Object.values(this.users));
  }
}


const LobbyManager = {
  lobbies: {},
  addLobby() {
    const lobbyId = randomLobbyId();
    this.lobbies[lobbyId] = new Lobby(lobbyId);
    this.emitLobbyStatus();
    return lobbyId;
  },
  removeLobby(id) {
    delete this.lobbies[id];
    this.emitLobbyStatus();
  },
  emitLobbyStatus() {
    io.of('/lobbies').emit('lobbies-changed', Object.keys(this.lobbies));
  },
};

io.of('/lobbies').on('connection', () => {
  LobbyManager.emitLobbyStatus();
});


const randomLobbyId = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let code = '';
  for (let i = 0; i < 4; i += 1) { code += letters[Math.floor(Math.random() * letters.length)]; }

  // Unlikely, but just in case code is a duplicate
  if (LobbyManager.lobbies[code]) { return randomLobbyId(); }

  return code;
};

router.get('/create-lobby', (_, res) => {
  const lobbyId = LobbyManager.addLobby();
  res.json({ lobbyId });
});


module.exports = router;
