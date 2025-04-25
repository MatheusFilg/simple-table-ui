import type { Data } from '@/types/data'
import {
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
// import type { User } from '../types/users'
import { columns } from './columns'

export const users = ref<Data[]>([])
export const page = ref<number>(0)
export const sorting = ref<SortingState>([])
// export const total_itens = ref<number>(1)
export const columnFilters = ref<ColumnFiltersState>([])

export function getGraphQLFilters(operator: string) {
  return columnFilters.value.reduce(
    (accumulator, { id, value }) => {
      if (!value) return accumulator

      accumulator[id] = {
        [operator]:
          operator === 'ilike'
            ? `%${value}%`
            : operator === 'notIlike'
              ? `%${value}%`
              : value,
      }
      return accumulator
    },
    {} as Record<string, unknown>
  )
}

export function resetAllFilters() {
  columnFilters.value = []
}

export const table = useVueTable({
  get data() {
    return users.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  pageCount: -1, //poderia ser -1 caso não houvesse a informação de quantas paginas
  manualFiltering: true,
  manualSorting: true,
  manualPagination: true,
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
  },
  onSortingChange: updater => {
    sorting.value =
      typeof updater === 'function' ? updater(sorting.value) : updater
    page.value = 0
  },
  onColumnFiltersChange: updater => {
    columnFilters.value =
      typeof updater === 'function' ? updater(columnFilters.value) : updater
    page.value = 0
  },
})
