import React, { useState } from 'react';
import io from 'socket.io-client';

let socket;

function HomePage() {

  const [tab, setTab] = useState({ home: true });
  const [lobbies, setLobbies] = useState([]);

  let username = localStorage.getItem('modi-username');

  if (!username || username === '') {
    username = prompt("Enter a username:");
    username && localStorage.setItem('modi-username', username);
  }

  !socket && (socket = io('/lobbies', { autoConnect: false }));
  tab.joinLobby ? socket.open() : socket.close();

  socket.on('connect', () => {
    socket.on('lobbies-changed', setLobbies);
  });

  const createLobby = async () => {
    const { lobbyId } = await (await fetch('/create-lobby')).json();
    window.location.replace(`/lobbies/${lobbyId}`);
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Modi</h1>
      <div className="white-line"></div>

      <div className="my-5"></div>

      {tab.home &&
        <div className="d-flex justify-content-around">
          <button className="btn btn-secondary" onClick={() => createLobby()}>Create Lobby</button>
          <button className="btn btn-primary" onClick={() => setTab({ joinLobby: true })}>Join Lobby</button>
        </div>
      }

      {tab.joinLobby &&
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Join Lobby:</h3>
            </div>
            <div className="card-body">
              <ol className="list-group">
                {lobbies.map((id, ind) => (
                  <li className="list-group-item">
                    {ind}: {id}
                    <a href={`/lobbies/${id}`} class="btn btn-primary">Join &rarr;</a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card-footer">
              <button className="btn btn-danger" onClick={() => setTab({ home: true })}>&larr; Back</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default HomePage;