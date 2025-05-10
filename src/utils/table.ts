import type { Data } from '@/types/data'
import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import { columns } from './columns'

export const users = ref<Data[]>([])
export const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 25,
})

export const sorting = ref<SortingState>([])
export const columnVisibility = ref<Record<string, boolean>>({
  sn_cooperativa: false,
  cd_cliente_monitor: false,
  cd_cliente_benner: false,
  dt_status: false,
  cd_centro_custo: false,
})
export const columnFilters = ref<ColumnFiltersState>([])

export function getGraphQLFilters(operator: string) {
  // talvez trocar de reduce para map quando for implementar multiplos valores
  return columnFilters.value.reduce(
    (accumulator, { value }: any) => {
      if (!value.inputValue?.[0]) return accumulator

      const columnName = value.columnValue[0]
      if (!columnName) return accumulator

      accumulator[columnName] = {
        [operator]: value.inputValue[0],
      }
      return accumulator
    },
    {} as Record<string, unknown>
  )
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
  pageCount: 10,
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
  //Ambas funções abaixas nao estao sendo chamadas

  // onColumnFiltersChange: updater => {
  //   columnFilters.value =
  //     typeof updater === 'function' ? updater(columnFilters.value) : updater
  // },
  // onColumnVisibilityChange: updater => {
  //   columnVisibility.value =
  //     typeof updater === 'function' ? updater(columnVisibility.value) : updater
  // },
})
