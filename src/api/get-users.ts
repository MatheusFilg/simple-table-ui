import type { Ref } from 'vue'
import { api } from '../lib/axios'
import type { User } from '../types/users'

export async function getUsers(
  page: Ref<number>,
  sortBy?: string,
  sortOrder?: string,
  filters?: Record<string, unknown>
) {
  let url = `/users?page=${page.value}&limit=20`

  if (sortBy && sortOrder) {
    url += `&orderBy=${sortBy}&order=${sortOrder}`
  }

  if (filters) {
    for (const key in filters) {
      const value = filters[key]
      if (value) url += `&${key}=${value}`
    }
  }

  const response = await api.get<User[]>(url)

  return response.data
}
