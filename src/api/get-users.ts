import { api } from "../lib/axios";
import type { UsersResponse } from "../types/users";


export async function getUsers() {
    const response = await api.get<UsersResponse>('/users')
    
    console.log(response.data.data)
    return response.data.data
}