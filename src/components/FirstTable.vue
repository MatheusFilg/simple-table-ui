<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/vue-table'
import { computed, ref, watchEffect } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { User } from '../types/users'
import { columns } from '../utils/columns'
import { getUsersQueryOptions } from '../queryOptions/get-users'

const users = ref<User[]>([])

const page = ref<number>(1)

const sorting = ref<SortingState>([])

const columnFilters = ref<ColumnFiltersState>([])
const filters = computed(() =>
  // ação de transformar o array em um objeto com os filtros
  columnFilters.value.reduce(
    (accumulator, { id, value }) => {
      if (value) accumulator[id] = value
      return accumulator
    },
    {} as Record<string, unknown>
  )
)

const { data: userData } = useQuery(
  getUsersQueryOptions(page, sorting, filters)
)

//Caso a API retorne informações de paginação, é possivel consumir
// const pageCount = computed(() => userData.value?.total_pages || 0)
// const totalItems = computed(() => userData.value?.total || 0)

const table = useVueTable({
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

function handleChangePage(currentPage: number) {
  page.value = currentPage
}

watchEffect(() => {
  if (userData.value) {
    users.value = userData.value
  }
})
</script>

<template>
    <div class="h-[95dvh] flex flex-col">
      <table class="self-center gap-2 flex flex-col">
        <thead>
          <tr>
            <th class="text-start" v-for="header in table.getFlatHeaders()" 
              :key="header.id"
              :class="header.column.getCanSort() ? 'cursor-pointer select-none' : '' "
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div>
                <FlexRender
                  :render="header.column.columnDef.header" 
                  :props="header.getContext()" 
                />
                  {{ {asc: '⬆', desc: '⬇'}[header.column.getIsSorted() as string] }}
              </div>
              <!-- <div v-if="header.column.getCanFilter()">
                <input
                  type="text"
                  :value="header.column.getFilterValue() as string"
                  @input="header.column.setFilterValue(($event.target as HTMLInputElement).value)"
                  placeholder="Filter..."
                />
              </div> -->
            </th>
          </tr>
        </thead>
        
        <tbody class="flex flex-col">
          <tr class="gap-10 flex flex-1 " v-for="row in table.getRowModel().rows" :key="row.id">
            <td class="text-start" v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-1 flex flex-row justify-center">
        <button 
          :disabled="page === 1"
          @click="handleChangePage(1)"
        >
          First Page
        </button>

        <button
          :disabled="page === 1"
          @click="handleChangePage(page - 1)"
        >
          Previous
        </button>

        <button
          :disabled="page === 5"
          @click="handleChangePage(page + 1)"
        >
          Next
        </button>

        <button
          :disabled="page === 5"
          @click="handleChangePage(5)"
        >
          Last Page
        </button>
      </div>

      <div>
        <p>Current Page: {{ page }} </p>
      </div>
    </div>
</template>