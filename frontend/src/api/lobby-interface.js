import { API_URL } from './contants';
import path from 'path';

export const create = (lobbyName) => {
  const url = path.join(API_URL, 'create-lobby');
  const requestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lobbyName })
  }
  return fetch(url, requestConfig).then(res => res.json());
}

export const get = (lobbyId) => {
  const url = path.join(API_URL, 'lobbies', lobbyId);
  const requestConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  return fetch(url, requestConfig).then(res => res.json());
}