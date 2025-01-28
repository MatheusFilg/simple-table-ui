<script setup lang="ts">

import { FlexRender, createColumnHelper, getCoreRowModel, getSortedRowModel, useVueTable, type ColumnFiltersState, type SortingState, } from '@tanstack/vue-table';
import { ref, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getUsers } from '../api/get-users';
import type { User } from '../types/users';

const users = ref<User[]>([])
const page = ref<number>(1)
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const { data: userData } = useQuery({
    queryKey: ['todos', page, sorting, columnFilters],
    queryFn: () => {
    const sortItem = sorting.value[0]
    const filters = columnFilters.value.reduce((acc, filter) => {
            acc[filter.id] = filter.value;
            return acc;
        }, {} as Record<string, any>)
    return getUsers(
      page,
      sortItem?.id,
      sortItem?.desc ? 'desc' : 'asc',
      filters
    );
  },
    staleTime: 1000 * 60 // 1 minuto
})

//Caso a API retorne informações de paginação, é possivel consumir
// const pageCount = computed(() => userData.value?.total_pages || 0)
// const totalItems = computed(() => userData.value?.total || 0)

const columnHelper = createColumnHelper<User>()

const columns = [
    {
        accessorKey: 'id',
        id: 'id',
    },
    columnHelper.accessor('first_name', {
        id: 'first_name',
        header: 'First Name',
        enableColumnFilter: true,
    }),
    // {
    //     accessorKey: 'first_name',
    //     id: 'first_name',
    // },
    {
        accessorKey: 'last_name',
        id: 'last_name',
        enableColumnFilter: true,
    },
    {
        accessorKey: 'email',
        id: 'email',
        enableColumnFilter: true,
    },
] // isso daqui pode ser um arquivo dentro de uma pasta utils, definindo coluna caso seja necessário

const table = useVueTable({
    get data() {
        return users.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,
  pageCount: 10, //poderia ser -1 caso não houvesse a informação de quantas paginas
  getSortedRowModel: getSortedRowModel(),
  manualFiltering: true,
  state: {
    get sorting() {
        return sorting.value
    },
    get columnFilters() {
        return columnFilters.value
    }
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
    page.value = 1
  },
  onColumnFiltersChange: (updater) => {
    columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater
    page.value = 1
  },
//   debugTable: true
})

function handleChangePage(currentPage: number) {
    page.value = currentPage
}

watchEffect(() => {
    if(userData.value) {
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