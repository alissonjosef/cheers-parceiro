import axios from 'axios';
import {BASE_URL} from '../Util/Constants';



const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

console.log(BASE_URL)

export default api;
