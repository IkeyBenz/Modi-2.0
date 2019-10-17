class Player {
  constructor(connectionId) {
    this.connectionId = connectionId;
    this.id = this.generateNewUserId();
  }
  generateNewUserId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let uid = '';
    for (let i = 0; i < 4; i += 1) { code += letters[Math.floor(Math.random() * letters.length)]; }

    // Unlikely, but just in case code is a duplicate
    if (uid in this.lobbies) { return randomLobbyId(); }

    return code;
  }

}


export default Player;