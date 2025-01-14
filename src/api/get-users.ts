import type { Ref } from "vue";
import { api } from "../lib/axios";
import type { User } from "../types/users";

export interface UsersResponse {
    page: Ref<number>;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
  }
  


export async function getUsers(page: Ref<number>) {
    const response = await api.get<UsersResponse>(`/users?page=${page.value}`)
    
    return response.data
}