import axios from 'axios';
import { API_URL } from './const';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helper';

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
  },
});
