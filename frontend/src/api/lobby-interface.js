import { API_URL } from './contants';
import path from 'path';

export const create = async (lobbyName) => {
  const url = path.join(API_URL, 'create-lobby');
  const requestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lobbyName })
  }
  return await (await fetch(url, requestConfig)).json();
}

export const get = async (lobbyId) => {
  const url = path.join(API_URL, 'lobbies', lobbyId);
  const requestConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  return await (await fetch(url, requestConfig)).json();
}