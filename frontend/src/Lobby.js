import React, { useState } from 'react';
import io from 'socket.io-client';

let socket;

function LobbyPage({ match }) {

  const [users, setUsers] = useState([]);

  const { id: lobbyId } = match.params;
  if (!socket) {
    socket = io(`/lobbies/${lobbyId}`);
  }

  const username = localStorage.getItem('modi-username');

  socket.on('connect', () => {
    socket.emit('join-attempt', username);
    socket.on('updated-lobby', setUsers);
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Lobby #{lobbyId}</h3>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {users.map((username, ind) => (
            <li key={ind} className="list-group-item">{username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LobbyPage;