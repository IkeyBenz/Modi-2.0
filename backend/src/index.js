const express = require('express');
const socketio = require('socket.io');

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: false }));

const server = app.listen(PORT, () => {
  console.log(`Running backend on ${PORT}`);
});

const io = socketio(server);


module.exports = {
  app,
  io
}

app.use(require('./controllers/Lobby'));