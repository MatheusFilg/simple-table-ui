import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import { columns } from './columns'
import type { User } from '@/types/users'

export const users = ref<User[]>([])
export const pagination = ref<PaginationState>({
  pageIndex: 1,
  pageSize: 25,
})

export const sorting = ref<SortingState>([])
export const columnVisibility = ref<Record<string, boolean>>()
export const columnFilters = ref<ColumnFiltersState>([])

export function getGraphQLFilters(operator: Array<string>) {
  const filters = columnFilters.value.reduce(
    (acc, { value }: any) => {
      if (!value.inputValue?.[0]) return acc

      const columnName = value.columnValue[0]
      if (!columnName) return acc

      acc[columnName] = {
        [operator[0]]: value.inputValue[0],
      }

      return acc
    },
    {} as Record<string, unknown>
  )
  return Object.keys(filters).length > 0 ? filters : {}
}

function setPagination({
  pageIndex,
  pageSize,
}: PaginationState): PaginationState {
  pagination.value.pageIndex = pageIndex
  pagination.value.pageSize = pageSize

  return { pageIndex, pageSize }
}

export const table = useVueTable({
  get data() {
    return users.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  // valor fixo pois ñ tem o total de itens
  pageCount: -1,
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
    get columnVisibility() {
      return columnVisibility.value
    },
    get pagination() {
      return pagination.value
    },
  },
  onSortingChange: updater => {
    sorting.value =
      typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onPaginationChange: updater => {
    typeof updater === 'function'
      ? setPagination(
          updater({
            pageIndex: pagination.value.pageIndex,
            pageSize: pagination.value.pageSize,
          })
        )
      : setPagination(updater)
  },
})
