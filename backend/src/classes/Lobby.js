var Lobby;
export function initLobbyClass(io) {

  // A class for game lobbies
  Lobby = class Lobby {

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
      this.players = {};
      this.broadcast = io.of(`/lobbies/${id}`);

      this.broadcast.on('connection', (socket) => {
        socket.on('disconnect', () => {
          this.removePlayer(socket.id);
        });
        socket.on('join-attempt', (username) => {
          this.addPlayer(socket.id, username);
        });
      });
    }

    addPlayer(userId, name) {
      !this.creator && (this.creator = userId);
      this.players[userId] = name;
      this._emitLobbyStatus();
    }

    removePlayer(userId) {
      delete this.players[userId];
      if (this.creator === userId) {
        const uids = Object.keys(this.players);
        this.creator = uids.length && uids[this._randomIndex(uids.length)];
      }
      this._emitLobbyStatus();
      !Object.keys(this.players).length && Lobby.Manager.removeLobby(this.info.id);
    }
    _randomIndex(max) {
      return Math.floor(Math.random() * max);
    }
    _emitLobbyStatus() {
      this.broadcast.emit('updated-lobby', {
        lobbyName: this.info.name,
        players: this.players,
        creator: this.creator
      });
    }
  }
}

export { Lobby as default }