import api from './api';

export const registerUser = async (data: any) => {
  return await api.post('/users', data);
};

export const loginUser = async (data: any) => {
  return await api.post('/users/login', data);
};