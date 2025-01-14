<script setup lang="ts">

import { FlexRender, getCoreRowModel, useVueTable, type PaginationState, } from '@tanstack/vue-table';
import { computed, ref, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getUsers } from '../api/get-users';
import type { User } from '../types/users';

const users = ref<User[]>([])
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 6,
})

const { data: userData, refetch } = useQuery({
    queryKey: ['todos', pagination.value.pageIndex],
    queryFn: () => getUsers(pagination.value.pageIndex +1),
    staleTime: 5000,
})

const pageCount = computed(() => userData.value?.total_pages || 0)
const totalItems = computed(() => userData.value?.total || 0)

const columns = [
    {
        accessorKey: 'id',
        id: 'Id'
    },
    {
        accessorKey: 'first_name',
        id: 'First Name'
    },
    {
        accessorKey: 'last_name',
        id: 'Last Name'
    },
    {
        accessorKey: 'email',
        id: 'Email'
    },
]

const table = useVueTable({
    get data() {
        return users.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,
  pageCount: pageCount.value, //poderia ser -1 caso não houvesse a informação de quantas paginas
  state: {
    pagination: pagination.value
  },
  onPaginationChange: (updater) => {
    if (typeof updater === 'function') {
      pagination.value = updater(pagination.value)
    } else {
      pagination.value = updater
    }
  },
})

function handleChangePage(pageIndex: number) {
    pagination.value.pageIndex = pageIndex
    refetch()
}

watchEffect(() => {
    if(userData.value) {
        users.value = userData.value.data
    }
})
</script>

<template>
    <div>
        <table>
            <thead>
                <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <th v-for="header in headerGroup.headers" :key="header.id" scope="col" @click="header.column.getToggleSortingHandler()?.($event)">
                        <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                        {{ {asc: '⬆', desc: '⬇'}[header.column.getIsSorted() as string] }}

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
                :disabled="pagination.pageIndex === 0"
                @click="handleChangePage(0)"
            >
                First Page
            </button>

            <button
                :disabled="pagination.pageIndex === 0"
                @click="handleChangePage(pagination.pageIndex - 1)"
            >
                Previous
            </button>

            <button
                :disabled="pagination.pageIndex === pageCount - 1"
                @click="handleChangePage(pagination.pageIndex +1)"
            >
                Next
            </button>

            <button
                :disabled="pagination.pageIndex === pageCount - 1"
                @click="handleChangePage(pageCount -1)"
            >
                Last Page
            </button>
        </div>
        <div>
            Total items: {{ totalItems }}
        </div>
    </div>
</template>