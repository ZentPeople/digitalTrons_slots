import axios from 'axios';

const BaseAxios = axios.create({
  baseURL: 'http://192.168.1.4:3000/',
  headers: {
    'Content-Type': 'application/json',
    version: 1,
  },
});

export const get = async (path, params = {}, headers = {}) => {
  console.log(`path`, path);
  return BaseAxios.get(path, {
    params,
  }).catch(err => {
    throw err;
  });
};

export const post = async (path, data = {}, params = {}, headers = {}) => {
  console.log(`path`, path);
  return BaseAxios.post(path, data, {
    params,
  }).catch(err => {
    throw err;
  });
};
