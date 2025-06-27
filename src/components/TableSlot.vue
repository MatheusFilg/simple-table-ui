<script setup lang="ts">
import { queryAllUsers } from '@/graphql/queries/user/getAllUsers'
import { FlexRender } from '@tanstack/vue-table'
import { useQuery } from '@vue/apollo-composable'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { pagination, sorting, table, users } from '../utils/table'
import AdvancedFilter, { type FilterItem } from './AdvancedFilter.vue'
import ColumnVisibility from './ColumnVisibility.vue'
import DateRangeFilter from './DateRangeFilter.vue'
import Pagination from './Pagination.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import type { User } from '@/types/users'

const filterState = ref({
  items: [] as FilterItem[],
  where: null as Record<string, any> | null
});

function handleFilterUpdate({ filters, where }: { filters: FilterItem[]; where: Record<string, any> | null }) {
  filterState.value.items = filters;
  filterState.value.where = where;
}

const { result, error } = useQuery<{ userTable: User[] }>(
  queryAllUsers,
  () => ({
    offset: pagination.value.pageIndex * pagination.value.pageSize,
    limit: pagination.value.pageSize,
    orderBy: sorting.value.length > 0 ? {
      field: sorting.value[0].id,
      direction: sorting.value[0].desc ? 'desc' : 'asc'
    } : null,
    where: filterState.value.items.length > 0 ? filterState.value.where : {},
  }),
  {fetchPolicy: 'cache-first'}
)

watchEffect(() => {
  if (result.value) {
    users.value = result.value.userTable
  }
})
</script>

<template>
      <div class="flex flex-row w-full justify-between align-middle">
        <AdvancedFilter :initial-filters="filterState.items" @update:filters="handleFilterUpdate" />
        <DateRangeFilter />
        <ColumnVisibility />
      </div>
      <div class="w-full overflow-auto border rounded h-[75vh] grid">
        <div v-if="error" class="text-red-500">Erro: {{ error.message }}</div>
        <Table>
          <TableHeader>
            <TableRow class="sticky top-0 bg-background hover:bg-background">
              <TableHead 
                v-for="header in table.getFlatHeaders()"
                :key="header.id"
                class="h-10 px-2 text-sm"
                colspan=1
              >
                <div class="flex flex-row items-center gap-1">
                  <div
                    class="flex flex-row items-center gap-1 py-1.5 px-1 rounded-lg"
                    :class="`${header.column.getCanSort() ? 'cursor-pointer hover:bg-accent' : 'cursor-default'}`"
                    @click="header.column.getToggleSortingHandler()?.($event)"
                  >
                    <FlexRender
                      :render="header.column.columnDef.header" 
                      :props="header.getContext()"
                    />
                    <ArrowUpNarrowWide v-if="header.column.getIsSorted() === 'asc'"/>
                    <ArrowDownWideNarrow v-if="header.column.getIsSorted() === 'desc'"/>
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody class="[&_tr:last-child]:border-0 overflow-hidden">
            <TableRow 
              class="text-sm font-medium border-b transition-colors hover:bg-muted/50"
              v-for="row in table.getRowModel().rows" 
              :key="row.id"
            >
              <TableCell 
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="px-2 py-1 text-start text-ellipsis overflow-hidden max-h-5"
              >
                <FlexRender 
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()" 
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div class="flex justify-center mt-2">
        <div class="flex items-center justify-between w-full">
          <p>Current Page: {{ pagination.pageIndex + 1 }} </p>
          <Pagination/>
        </div>
      </div>
</template>