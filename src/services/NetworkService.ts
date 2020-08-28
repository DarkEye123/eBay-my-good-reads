import axios from 'axios';

export interface NetworkError {
  message: string;
  id: number;
}

export const client = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
