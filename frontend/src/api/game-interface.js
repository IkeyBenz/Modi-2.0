import path from 'path';
import { API_URL } from './contants';

export const create = async (lobbyId, connectionId) => {
  const url = path.join(API_URL, 'lobbies', lobbyId, 'make-game');
  const requestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ connectionId })
  }

  return await (await fetch(url, requestConfig)).json();
}