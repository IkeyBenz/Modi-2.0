import React, { useState } from 'react';
import io from 'socket.io-client';

let socket;
const GamePage = ({ match }) => {

  const { id: gameId } = match.params;
  const [gameState, setGameState] = useState({});
  const myPlayerId = sessionStorage.getItem(`modi-${gameId}-playerId`);

  !socket && myPlayerId && (socket = io(`/games/${gameId}`));
  myPlayerId && socket.on('connect', () => {
    socket.emit('join-attempt', myPlayerId);
    socket.on('game-state-changed', setGameState);
  })

  const { players } = gameState;



  return (
    <div className='container-fluid'>

      <h1>Game Page</h1>
      <ul className="list-group">
        {Object.keys(players).map(uid => {
          <li key={uid} className={"list-group-item" + uid === myPlayerId && " text-primary"}>{players[uid].username}</li>
        })}
      </ul>
    </div>
  )
}

export default GamePage;