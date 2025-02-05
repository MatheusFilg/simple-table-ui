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
import { Button } from './ui/button'
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
      <div class="flex flex-row gap-2 px-4 py-2">
        <input
          type="text"
          :value="table.getColumn('id')?.getFilterValue() as string"
          @input="table.getColumn('id')?.setFilterValue(($event.target as HTMLInputElement).value)"
          placeholder="Filtrar por ID"
        />
        <input
          type="text"
          :value="table.getColumn('first_name')?.getFilterValue() as string"
          @input="table.getColumn('first_name')?.setFilterValue(($event.target as HTMLInputElement).value)"
          placeholder="Filtrar pelo Nome"
        />
        <input
          type="text"
          :value="table.getColumn('last_name')?.getFilterValue() as string"
          @input="table.getColumn('last_name')?.setFilterValue(($event.target as HTMLInputElement).value)"
          placeholder="Filtrar pelo Sobrenome"
        />
        <input
          type="text"
          :value="table.getColumn('email')?.getFilterValue() as string"
          @input="table.getColumn('email')?.setFilterValue(($event.target as HTMLInputElement).value)"
          placeholder="Filtrar por Email"
        />
      </div>
      
      <table class="self-center gap-2 flex flex-col w-">
        <thead>
          <tr>
            <th 
              v-for="header in table.getFlatHeaders()"
              :key="header.id"
              :style="`width: ${header.getSize()}px`"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div class="flex flex-row items-center gap-1 cursor-pointer text-xl">
                <FlexRender
                  :render="header.column.columnDef.header" 
                  :props="header.getContext()" 
                />
                <span >
                  {{ {asc: '⬆', desc: '⬇'}[header.column.getIsSorted() as string] }}
                </span>
              </div>
              <!-- <div v-if="header.column.getCanFilter()">
            
              </div> -->
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr 
            v-for="row in table.getRowModel().rows" 
            :key="row.id"
          >
            <td 
              class="text-lg"
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender 
                :style="`width: ${cell.column.getSize()}px`"
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()" 
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-1 flex gap-2 flex-row justify-center">
        <Button
          variant="outline"
          class="border-1 duration-250 cursor-pointer"
          :disabled="page === 1"
          @click="handleChangePage(1)"
        >
          First Page
        </Button>

        <Button
          variant="outline"
          class="border-1 duration-250 cursor-pointer"
          :disabled="page === 1"
          @click="handleChangePage(page - 1)"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          class="border-1 duration-250 cursor-pointer"
          :disabled="page === 5"
          @click="handleChangePage(page + 1)"
        >
          Next
        </Button>

        <Button
          variant="outline"
          class="border-1 duration-250 cursor-pointer"
          :disabled="page === 5"
          @click="handleChangePage(5)"
        >
          Last Page
        </Button>
      </div>

      <div>
        <p>Current Page: {{ page }} </p>
      </div>
    </div>
</template>