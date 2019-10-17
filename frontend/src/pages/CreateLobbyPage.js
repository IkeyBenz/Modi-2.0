import React, { useState } from 'react';
import { create } from '../api/lobby-interface';

const CreateLobbyPage = () => {

  const [lobbyName, setLobbyName] = useState('');

  const createLobby = async () => {
    const { success, error, lobbyId } = await create(lobbyName);
    if (error)
      return alert(`Error: ${error}`);
    window.location.replace(`/lobbies/${lobbyId}`);
  }

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Create Lobby:</h3>
        </div>
        <div className="card-body">
          <div className="input-group">
            <input className="form-control"
              type="text"
              value={lobbyName}
              placeholder="Enter lobby name..."
              onChange={(e) => setLobbyName(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={createLobby} disabled={lobbyName === ''}>Create &rarr;</button>
            </div>
          </div>
          <div className="card-footer">
            <a className="btn btn-danger" href="/">&larr; Back</a>
          </div>
        </div>
      </div>
    </div >
  );
}

export default CreateLobbyPage;