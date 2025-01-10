<script setup lang="ts">

import { FlexRender, getCoreRowModel, useVueTable, } from '@tanstack/vue-table';
import { ref, watchEffect } from 'vue';
import type { Todo } from '../types/users';
import { useQuery } from '@tanstack/vue-query';
import { getTodos } from '../api/get-todo';



const todos = ref<Todo[]>([])

const { data:todosData, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
    initialData: [],
    enabled: true,
    staleTime: 0,          
})

watchEffect(() => {
    if(todosData.value) {
        todos.value = todosData.value
    }
})

console.log(todosData.value, 'todosData value')
console.log(todos.value, 'todos value')
console.log(todosData, 'aaa')

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
        <div v-if="isLoading">
            <span>Is loading...</span>
        </div>
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