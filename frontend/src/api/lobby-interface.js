import { API_URL } from './contants';
import path from 'path';

export const create = async (lobbyName) => {
  const url = path.join(API_URL, 'create-lobby');
  console.log(url);
  const requestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lobbyName })
  }

  return await (await fetch(url, requestConfig)).json();
}