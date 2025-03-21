import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configRegExp } from "expo-router/build/fork/getStateFromPath-forks";

const API_URL = 'https://devapi-618v.onrender.com/api/auth/login';

const api = axios.create({ baseURL: API_URL});


api.interceptors.request.use( async(config) =>{
    const token = await AsyncStorage.getItem('token');
    if (token) config.headers.Authorization = $(token);
    return config;
});

export const getUser = async () => {
    const { data } = awat api.get('/user');
    return data;
};

export const getUserByid = async (id: number) => {
    const { data } = await api.get(`/user/${id}`);
    return data;
};

export const createUser = async (username: string, password: string) => {
    await api.post('/user',{username,password});
};

export const updateUser = async (id: number, username: string) => {
    await api.put(`/user/${id}`, { username});
};

export const deleteUser = async (id: number) => {
    await api.delete(`/user/${id}`);
};

export default api;