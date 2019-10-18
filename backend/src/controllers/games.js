import ModiGame from '../classes/Game';
import Lobby from '../classes/Lobby';

export default function useGamesController(app) {

  app.post('/lobbies/:id/make-game', (req, res) => {
    // Ensure the request is being made by the lobby admin
    const { connectionId } = req.body;
    const { id } = req.params;

    const lobby = Lobby.Manager.lobbies[id];
    if (!(lobby.creator === connectionId)) {
      return res.json({ error: "You are not the lobby admin!" });
    }

    // Convert lobby into game:
    ModiGame.Manager.createGameFromLobby(lobby);
    Lobby.Manager.removeLobby(id);

    res.end();
  });
}