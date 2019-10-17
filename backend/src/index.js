import express from 'express';
import socketIO from 'socket.io';
import 'dotenv/config';

import useLobbyController from './controllers/Lobby';

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Running backend on ${PORT}`);
});

const io = new socketIO(server);

useLobbyController(app, io);