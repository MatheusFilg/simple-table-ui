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
  


export async function getUsers(page: Ref<number>, sortBy?: string, sortOrder?: string) {
  let url = `/users?key=f136e380&page=${page.value}`

  if (sortBy && sortOrder) {
    url += `&sort=${sortBy}&order=${sortOrder}`
  }
  const response = await api.get<UsersResponse>(url)
    
  return response.data
}