import Player from './Player';
import Lobby from './Lobby';

var ModiGame;
export function initGameClass(io) {
  ModiGame = class ModiGame {

    static Manager = {
      games: {},
      createGameFromLobby(lobby) {
        const players = Object.keys(lobby.players).map((connectionId) => {
          const player = lobby.players[connectionId];
          io.to(connectionId).send('player-id', player.uid);
          return new Player(player.username, connectionId);
        });
        const game = new ModiGame(players, lobby.info.id);
        this.games[lobby.info.id] = game;
        return game;
      }
    }

    constructor(players, gameId) {
      this.id = gameId;

      this.players = {};
      this.playersByConnection = {}
      this.invitedPlayers = new Set(players.map((player) => {
        this.players[player.uid] = player;
        return player.uid;
      }));

      this.broadcast = io.of(`/games/${gameId}`);

      this.broadcast.on('connection', (socket) => {
        socket.on('disconnect', () => {
          this.playersByConnection[socket.id].setConnectionId(null);
          delete this.playersByConnection[socket.id];
          this.emitGameStatus();
        });
        socket.on('join-attempt', (playerId) => {
          if (this.invitedPlayers.has(playerId)) {
            this.players[playerId].setConnectionId(socket.id);
            this.playersByConnection[socket.id] = this.players[playerId];
            this.emitGameStatus();
          }
        });
      });
    }

    emitGameStatus() {
      this.broadcast.emit('game-state-changed', {
        players: this.players,
      });
    }
  }
}

export { ModiGame as default }
