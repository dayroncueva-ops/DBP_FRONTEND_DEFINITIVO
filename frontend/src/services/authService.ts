import api from "../api/axios";

export async function register(body:{
    email: string;
    password: string;
    name: string;
}) {
    const response = await api.post("/auth/register",body);
    return response.data;
}

export async function login (body:{
    email: string;
    password: string;
}) {
    const response = await api.post("/auth/login",body);
    return response.data;
}