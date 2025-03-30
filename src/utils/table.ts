import {
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { computed, ref } from 'vue'
import type { User } from '../types/users'
import { columns } from './columns'

export const users = ref<User[]>([])
export const page = ref<number>(0)
export const sorting = ref<SortingState>([])
// export const total_itens = ref<number>(1)
const columnFilters = ref<ColumnFiltersState>([])
export const filters = computed(() =>
  // ação de transformar o array em um objeto com os filtros
  columnFilters.value.reduce(
    (accumulator, { id, value }) => {
      // adequando como é repassado para a query \/
      if (value) accumulator[id] = { ilike: `%${value}%` }
      // console.log(value, 'aaaa')
      return accumulator
    },
    {} as Record<string, unknown>
  )
)

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
