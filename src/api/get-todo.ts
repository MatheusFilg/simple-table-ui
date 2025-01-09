import { api } from "../lib/axios";
import type { Todo } from "../types/users";

export async function getTodos() {
    const response = await api.get<Todo[]>('/todos')
    
    console.log(response.data, 'response')
    return response.data
}