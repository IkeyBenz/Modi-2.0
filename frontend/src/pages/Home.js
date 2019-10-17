import React from 'react';


function HomePage() {

  let username = localStorage.getItem('modi-username');

  if (!username || username === '') {
    username = prompt("Enter a username:");
    username && localStorage.setItem('modi-username', username);
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center">Modi</h1>
      <div className="white-line"></div>

      <div className="my-5"></div>

      <div className="d-flex justify-content-around">
        <a className="btn btn-secondary" href="/create-lobby">Create Lobby</a>
        <a className="btn btn-primary" href="/lobbies">Join Lobby</a>
      </div>
    </div>
  );
}

export default HomePage;