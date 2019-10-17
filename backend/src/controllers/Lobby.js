const router = require('express').Router();
const { io } = require('../index');


class Lobby {
  constructor(id, name, onEmptyLobby) {
    this.info = { id, name };
    this.users = {};
    this.onEmptyLobby = onEmptyLobby;
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

    !this.users.length && this.onEmptyLobby();
  }
}


const LobbyManager = {
  lobbies: {},
  lobbyNames: new Set(),
  addLobby(lobbyName) {
    if (this.lobbyNames.has(lobbyName)) {
      throw new Error('A lobby with that name already exists.');
    }
    const lobbyId = this.randomLobbyId();
    this.lobbies[lobbyId] = new Lobby(lobbyId, lobbyName, () => this.removeLobby(lobbyId));
    this.lobbyNames.add(lobbyName);
    this.emitLobbyStatus();
    return lobbyId;
  },
  removeLobby(id) {
    this.lobbyNames.delete(this.lobbies[id].info.name);
    delete this.lobbies[id];
    this.emitLobbyStatus();
  },
  emitLobbyStatus() {
    const lobbies = Object.values(this.lobbies).map(l => l.info);
    io.of('/lobbies').emit('lobbies-changed', lobbies);
  },
  randomLobbyId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let code = '';
    for (let i = 0; i < 4; i += 1) { code += letters[Math.floor(Math.random() * letters.length)]; }

    // Unlikely, but just in case code is a duplicate
    if (code in this.lobbies) { return randomLobbyId(); }

    return code;
  },
};

io.of('/lobbies').on('connection', () => {
  LobbyManager.emitLobbyStatus();
});

router.post('/create-lobby', (req, res) => {
  const { lobbyName } = req.body;
  try {
    const lobbyId = LobbyManager.addLobby(lobbyName);
    res.json({ success: `Create lobby: ${lobbyName}`, lobbyId });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get('/lobbies/:id', (req, res) => {
  const { id } = req.params;
  if (!(id in LobbyManager.lobbies)) {
    return res.json({ error: "Lobby doesn't exist" });
  }
  res.json({ info: LobbyManager.lobbies[id].info });
});

module.exports = router;
