// A function to create the Lobby class using an io object
export default function InitializeLobbyClass(io) {

  // A class for game lobbies
  class Lobby {

    // Handles CRUDing of lobbies
    static Manager = {
      lobbies: {},
      lobbyNames: new Set(),
      addLobby(lobbyName) {
        if (this.lobbyNames.has(lobbyName)) {
          throw new Error('A lobby with that name already exists.');
        }
        const lobbyId = this.randomLobbyId();
        this.lobbies[lobbyId] = new Lobby(lobbyId, lobbyName);
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
    }


    constructor(id, name) {
      this.info = { id, name };
      this.users = {};
      this.broadcast = io.of(`/lobbies/${id}`);

      this.broadcast.on('connection', (socket) => {
        console.log(`${this.info.name}'s users: ${this.users}`);
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
      !Object.keys(this.users).length && Lobby.Manager.removeLobby(this.info.id);
    }
  }

  return Lobby;
}