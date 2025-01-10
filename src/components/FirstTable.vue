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

const { data: userData } = useQuery({
    queryKey: ['todos', pagination],
    queryFn: () => getUsers(pagination.value.pageIndex + 1),
    staleTime: 5000,
})

const pageCount = computed(() => userData.value?.total_pages || 0)

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
  pageCount,
  state: {
    pagination,
  },
  onPaginationChange: (updater) => {
    pagination.value = updater(pagination.value)
    refetch()
  },
})

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
            @click="table.previousPage()"
        >
            First Page
        </button>

            <button
                :disabled="!table.getCanPreviousPage()"
                @click="table.previousPage()"
            >
                Previous
            </button>

            <button
                @click="table.nextPage()"
            >
                Next
            </button>

            <button
                :disabled="!table.getCanNextPage()"
                @click="table.setPageIndex(table.getPageCount() -1)"
            >
            Last Page
            </button>

        </div>
    </div>
</template>