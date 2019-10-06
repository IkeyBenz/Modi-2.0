import React, { useState } from 'react';
import io from 'socket.io-client';

let socket;

function LobbiesPage() {

  const [lobbies, updateLobbies] = useState([]);

  !socket && (socket = io('localhost:5000/lobbies'));

  socket.on('connect', () => {
    socket.on('lobbies-changed', updateLobbies);
  });

  return (
    <div className="container-fluid">
      <div className="card mt-3">
        <div className="card-header">
          <h3 className="card-title">Join Lobby:</h3>
        </div>
        <div className="card-body">
          <ol className="list-group">
            {lobbies.map((id, ind) => (
              <li key={ind} className="list-group-item d-flex justify-content-between">
                {ind + 1}) {id}
                <a className="btn btn-primary" href={`/lobbies/${id}`}>Join &rarr;</a>
              </li>
            ))}
          </ol>
        </div>
        <div className="card-footer">
          <a className="btn btn-danger" href="/">&larr; Back</a>
        </div>
      </div>
    </div>
  );
}

export default LobbiesPage;