import express from 'express';
import socketIO from 'socket.io';
import 'dotenv/config';

import useLobbyController from './controllers/lobbies';
import useGameController from './controllers/games';
import { initLobbyClass } from './classes/Lobby';
import { initGameClass } from './classes/Game';

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Running backend on ${PORT}`);
});

const io = new socketIO(server);

initLobbyClass(io);
initGameClass(io);

useLobbyController(app, io);
useGameController(app);

app.use('/', (err, req, res, next) => {
  if (err) {
    return res.json({ error: err.message });
  }
  next();
});
