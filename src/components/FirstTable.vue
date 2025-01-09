<script setup lang="ts">

import { FlexRender, getCoreRowModel, useVueTable, type ColumnDef, getPaginationRowModel, getSortedRowModel, type SortingState, getFilteredRowModel } from '@tanstack/vue-table';
// import people from '../mockData.json'
import { h, onMounted, ref, type MaybeRef } from 'vue';
import EditButton from './EditButton.vue';
import type { UsersResponse } from '../types/users';
import { getUsers } from '../api/get-users';
import { useQuery } from '@tanstack/vue-query'

// interface People {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   title: string;
//   role: string;
//   created_at: string;
// }


const userData = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers()
})
console.log(userData, 'userData')

// Corpo da Tabela utilizando mock
// const data = ref<UsersResponse[]>()
// Colunas da Tabela
const peopleColumns: ColumnDef<UsersResponse>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    // {
    //     accessorFn: row => `${row.} ${row.last_name}`,
    //     header: 'Full Name'
    // },
    {
        accessorKey: 'first_name',
        header: 'First Name',
    },
    {
        accessorKey: 'last_name',
        header: 'Last Name',
    },
    
    {
        accessorKey: 'email',
        header: 'Email',
    },
    // {
    //     accessorKey: 'title',
    //     header: 'Title',
    // },
    // {
    //     accessorKey: 'role',
    //     header: 'Role',
    // },
    // {
    //     accessorKey: 'created_at',
    //     header: 'Created At',
    // },
    {
        accessorKey: 'edit',
        header: ' ',
        cell: ({row}) => h(EditButton)
    },
]
const sorting = ref<SortingState>([])
const filter = ref('')

// Instancia da Tabela
const table = useVueTable({
    // As 3 coisas requeridas
    data: userData.data,
    columns: peopleColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updateOrValue => {
        sorting.value = typeof updateOrValue === 'function' ? updateOrValue(sorting.value) : updateOrValue
    },
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
        pagination: {
            pageSize: 20
        }
    },
    state: {
        get sorting(){
            return sorting.value
        },
        get globalFilter() {
            return filter.value
        }
    },
})


</script>

<template>
    <div>
        <div>
            <input type="text" v-model="filter" />
        </div>
        <table>
            <thead>
                <!-- Grupo de Header -->
                <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <!-- Header Individualmente -->
                    <th v-for="header in headerGroup.headers" :key="header.id" scope="col" @click="header.column.getToggleSortingHandler()?.($event)">
                        <!-- 
                            :render="Toda essa coluna será um header"  
                            :props="Pelo header poder ser: string, jsx ou fn ele lida com as 3 opções" 
                         -->
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

        <div>Page {{ table.getState().pagination.pageIndex +1 }} of {{ table.getPageCount() }} - {{ table.getFilteredRowModel().rows.length }} results</div>
        
        <div>
            <button @click="table.setPageSize(20)">
                Page Size: 20
            </button>

            <button @click="table.setPageSize(50)">
                Page Size: 50
            </button>
        </div>
        
        <div>
            <button @click="table.setPageIndex(0)">
                First Page
            </button>

            <button @click="table.previousPage()" :disabled="!table.getCanPreviousPage()">
                Previous Page
            </button>

            <button @click="table.nextPage()" :disabled="!table.getCanNextPage()">
                Next Page
            </button>

            <button @click="table.setPageIndex(table.getPageCount() - 1)">
                Last Page
            </button>
        </div>
    </div>
</template>

