import React, { useState } from 'react';
import io from 'socket.io-client';
import { get } from '../api/lobby-interface';

let socket;
let lobbyName;
function LobbyPage({ match }) {

  const [users, setUsers] = useState([]);
  const { id: lobbyId } = match.params;

  !socket && (socket = io(`/lobbies/${lobbyId}`));
  socket.on('connect', () => {
    socket.emit('join-attempt', localStorage.getItem('modi-username'));
    socket.on('updated-lobby', setUsers);
  });

  !lobbyName && ((async () => {
    const { info, error } = await get(lobbyId);
    if (error)
      return alert(error);

    lobbyName = info.name;
  })());

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Lobby #{lobbyName}</h3>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {users.map((username, ind) => (
              <li key={ind} className="list-group-item">{username}</li>
            ))}
          </ul>
        </div>
        <div className="card-footer">
          <a className="btn btn-danger" href="/lobbies">&larr; Back</a>
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;