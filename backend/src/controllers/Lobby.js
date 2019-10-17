import InitializeLobbyClass from '../classes/Lobby';

export default function useLobbyController(app, io) {

  const Lobby = InitializeLobbyClass(io);

  io.of('/lobbies').on('connection', () => {
    Lobby.Manager.emitLobbyStatus();
  });

  app.post('/create-lobby', (req, res) => {
    const { lobbyName } = req.body;
    try {
      const lobbyId = Lobby.Manager.addLobby(lobbyName);
      res.json({ success: `Create lobby: ${lobbyName}`, lobbyId });
    } catch (e) {
      res.json({ error: e.message });
    }
  });

  app.get('/lobbies/:id', (req, res) => {
    const { id } = req.params;
    if (!(id in Lobby.Manager.lobbies)) {
      return res.json({ error: "Lobby doesn't exist" });
    }
    res.json({ info: Lobby.Manager.lobbies[id].info });
  });
}