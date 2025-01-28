import type { Ref } from "vue"
import { api } from "../lib/axios"
import type { User } from "../types/users"

// export interface UsersResponse {
//     page: Ref<number>;
//     per_page: number;
//     total: number;
//     total_pages: number;
//     data: User[]
//   }
  

export async function getUsers(page: Ref<number>, sortBy?: string, sortOrder?: string, filters?: Record<string, any>) {
  let url = `/users?page=${page.value}&limit=10`

  if (sortBy && sortOrder) {
    url += `&orderBy=${sortBy}&order=${sortOrder}`
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
        if (value) url += `&${key}=${value}`
    });
}

  const response = await api.get<User[]>(url)

  return response.data
}