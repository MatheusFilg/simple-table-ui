<script setup lang="ts">
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  useVueTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/vue-table'
import { computed, ref, watchEffect } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getUsers } from '../api/get-users'
import type { User } from '../types/users'

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

const { data: userData } = useQuery({
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

//Caso a API retorne informações de paginação, é possivel consumir
// const pageCount = computed(() => userData.value?.total_pages || 0)
// const totalItems = computed(() => userData.value?.total || 0)

const columnHelper = createColumnHelper<User>()

const columns = [
  {
    accessorKey: 'id',
    id: 'id',
    enableColumnFilter: false,
  },
  columnHelper.accessor('first_name', {
    id: 'first_name',
    header: 'First Name',
  }),
  // {
  //     accessorKey: 'first_name',
  //     id: 'first_name',
  // },
  {
    accessorKey: 'last_name',
    id: 'last_name',
  },
  {
    accessorKey: 'email',
    id: 'email',
  },
] // isso daqui pode ser um arquivo dentro de uma pasta utils, definindo coluna caso seja necessário

const table = useVueTable({
  get data() {
    return users.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  pageCount: 10, //poderia ser -1 caso não houvesse a informação de quantas paginas
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
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="header in table.getFlatHeaders()" 
                        :key="header.id"
                        :class="header.column.getCanSort() ? 'cursor-pointer select-none' : '' "
                        @click="header.column.getToggleSortingHandler()?.($event)"
                    >
                        <div>
                            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                            {{ {asc: '⬆', desc: '⬇'}[header.column.getIsSorted() as string] }}
                        </div>

                        <div v-if="header.column.getCanFilter()">
                            <input
                                type="text"
                                :value="header.column.getFilterValue() as string"
                                @input="header.column.setFilterValue(($event.target as HTMLInputElement).value)"
                                placeholder="Filter..."
                            />
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="row in table.getRowModel().rows" :key="row.id">
                    <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
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
                :disabled="page === 10"
                @click="handleChangePage(page + 1)"
            >
                Next
            </button>

            <button
                :disabled="page === 10"
                @click="handleChangePage(10)"
            >
                Last Page
            </button>
        </div>
        <div>
            <p>Current Page: {{ page }} </p>
        </div>
    </div>
</template>