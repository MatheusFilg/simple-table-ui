<script setup lang="ts">

import { FlexRender, getCoreRowModel, useVueTable, } from '@tanstack/vue-table';
import { computed, ref, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getUsers } from '../api/get-users';
import type { User } from '../types/users';

const users = ref<User[]>([])
const page = ref<number>(1)

const { data: userData } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => getUsers(page),
    staleTime: 1000 * 60 // 1 minuto
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
] // isso daqui pode ser um arquivo dentro de uma pasta utils, definindo coluna caso seja necessário

const table = useVueTable({
    get data() {
        return users.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,
  pageCount: pageCount.value, //poderia ser -1 caso não houvesse a informação de quantas paginas
})

function handleChangePage(currentPage: number) {
    page.value = currentPage
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
                :disabled="page === pageCount"
                @click="handleChangePage(page + 1)"
            >
                Next
            </button>

            <button
                :disabled="page === pageCount"
                @click="handleChangePage(pageCount)"
            >
                Last Page
            </button>
        </div>
        <div>
            Total items: {{ totalItems }}
            <p>Current Page: {{ page }} </p>
        </div>
    </div>
</template>