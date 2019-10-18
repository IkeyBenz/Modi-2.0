import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

let socket;
function LobbyPage({ match }) {

  const [lobbyInfo, setLobbyInfo] = useState({});
  const { lobbyName, players, creator } = lobbyInfo;
  const { id: lobbyId } = match.params;

  if (!sessionStorage.getItem(`modi-${lobbyId}-username`)) {
    sessionStorage.setItem(`modi-${lobbyId}-username`, prompt('Enter your username:'));
  }

  !socket && (socket = io(`/lobbies/${lobbyId}`));
  socket.on('connect', () => {
    socket.emit('join-attempt', sessionStorage.getItem(`modi-${lobbyId}-username`));
    socket.on('updated-lobby', setLobbyInfo);
  });

  const isAdmin = socket.id === creator;
  const createGame = () => {

  }

  return (
    <div className="container-fluid">
      <div className="card mt-3">
        <div className="card-header">
          {lobbyName && <h3 className="card-title">{lobbyName}</h3>}
        </div>
        <div className="card-body">
          <ul className="list-group">
            {players && Object.keys(players).map((connectionId) => (
              <li key={connectionId} className="list-group-item">
                {connectionId === creator && <FontAwesomeIcon icon={faCrown} />}
                {" "}
                {players[connectionId]}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <a className="btn btn-danger" href="/lobbies">&larr; Back</a>
          {isAdmin && <button className="btn btn-primary" onClick={createGame}>Start &rarr;</button>}
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;