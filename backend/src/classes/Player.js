class Player {
  static uids = new Set();

  constructor(username) {
    this.username = username;
    this.uid = this._genUID()
    this.lives = 3;
    this.connectionId = null;
  }
  _genUID() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let uid = '';
    for (let i = 0; i < 5; i++) {
      uid += letters[Math.floor(Math.random() * letters.length)];
    }
    return Player.uids.has(uid) ? this._genUID() : Player.uids.add(uid) && uid;
  }

  set setConnectionId(id) {
    this.connectionId = id;
  }

}


export default Player;