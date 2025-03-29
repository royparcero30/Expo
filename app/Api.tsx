// api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://devapi-618v.onrender.com/api/auth/login';

const api = axios.create({ baseURL: API_URL });

// Interceptor to add Authorization header with the token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface User {
  id: number;
  username: string;
}

export const getUser = async (): Promise<User[]> => {
  const { data } = await api.get('/user');
  return data;
};

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

export const createUser = async (username: string, password: string): Promise<void> => {
  await api.post('/user', { username, password });
};

export const updateUser = async (id: number, username: string): Promise<void> => {
  await api.put(`/user/${id}`, { username });
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/user/${id}`);
};

export default api;
