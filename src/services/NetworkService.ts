import axios from 'axios';

export interface NetworkError {
  message: string;
  id: number;
}

export const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
