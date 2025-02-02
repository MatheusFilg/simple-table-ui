import { queryOptions } from "@tanstack/vue-query";
import { getUsers } from "../api/get-users";
import type { SortingState } from "@tanstack/vue-table";
import type { ComputedRef, Ref } from "vue";

export function getUsersQueryOptions(page: Ref<number, number>, sorting: Ref<SortingState>, filters: ComputedRef<Record<string, unknown>>) {
    return queryOptions({
        queryKey: ['todos', page, sorting, filters],
        queryFn: () => {
          const sortItem = sorting.value[0]
          return getUsers(
            page,
            sortItem?.id,
            sortItem?.desc ? 'desc' : 'asc',
            filters.value
          )
        },
        staleTime: 1000 * 60, // 1 minuto
      })
}