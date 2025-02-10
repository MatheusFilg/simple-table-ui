import { useVueTable, getCoreRowModel, type SortingState, type ColumnFiltersState } from "@tanstack/vue-table"
import { columns } from "./columns"
import type { User } from "../types/users"
import { computed, ref  } from "vue"

export const users = ref<User[]>([])
export const page = ref<number>(1)
export const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
export const filters = computed(() =>
    // ação de transformar o array em um objeto com os filtros
    columnFilters.value.reduce(
      (accumulator, { id, value }) => {
        if (value) accumulator[id] = value
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
    pageCount: 5, //poderia ser -1 caso não houvesse a informação de quantas paginas
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
      page.value = 1
    },
    onColumnFiltersChange: updater => {
      columnFilters.value =
        typeof updater === 'function' ? updater(columnFilters.value) : updater
      page.value = 1
    },
  })