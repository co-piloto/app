import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.lucassoares.dev',
});

export default instance;
