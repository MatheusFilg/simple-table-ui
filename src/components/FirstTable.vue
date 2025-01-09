<script setup lang="ts">

import { FlexRender, getCoreRowModel, useVueTable, } from '@tanstack/vue-table';
import { ref } from 'vue';
import type { Todo } from '../types/users';
import { useQuery } from '@tanstack/vue-query';
import { getTodos } from '../api/get-todo';

// const todos = ref<Todo[]>([
//     {
//         'userId': 1,
//         'id': 1,
//         'title': 'Titulo 1',
//         'completed': false,
//     },
//     {
//         'userId': 1,
//         'id': 2,
//         'title': 'Titulo 2',
//         'completed': true,
//     },
// ])
// const columns: ColumnDef<Todo>[] = []

const todos = ref<Todo[]>([])

const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos()
})

console.log(data.value, 'value')
console.log(data, 'aaa')




const columns = [
    {
        accessorKey: 'userId',
        id: 'userId'
    },
    {
        accessorKey: 'id',
        id: 'Id'
    },
    {
        accessorKey: 'title',
        id: 'Title'
    },
    {
        accessorKey: 'completed',
        id: 'Completed'
    },
]

const table = useVueTable({
    data: todos.value,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    </div>
</template>