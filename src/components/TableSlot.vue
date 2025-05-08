<script setup lang="ts">
import { FlexRender } from '@tanstack/vue-table'
import { useQuery } from '@vue/apollo-composable'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-vue-next'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { columnFilters, columnVisibility, getGraphQLFilters, page, sorting, table, users } from '../utils/table'
import Pagination from './Pagination.vue'

import { queryAllData } from '@/graphql/queries/data'
import type { Data } from '@/types/data'
import AdvancedFilter from './AdvancedFilter.vue'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

const operatorValue = ref('')
function handleChangeOperator(filter: string) {
  operatorValue.value = filter
}

const { result, error } = useQuery<{ dados: Data[] }>(
  queryAllData,
  () => ({
    offset: page.value * 25,
    limit: 25,
    orderBy: sorting.value.length > 0 ? {
      field: sorting.value[0].id,
      direction: sorting.value[0].desc ? 'desc' : 'asc'
    } : null,
    where: columnFilters.value.length > 0 ? getGraphQLFilters(operatorValue.value) : {},
  }),
  {fetchPolicy: 'cache-first'}
)

watchEffect(() => {
  if (result.value) {
    users.value = result.value.dados
  }
})

const checkedColumns = ref<Record<string, boolean>>({})

onMounted(() => {
  table.getAllLeafColumns().map(column => {
    checkedColumns.value[column.id] = column.getIsVisible()
  })
})

watch(checkedColumns, (newVal) => {
  columnVisibility.value = { ...newVal }
}, { deep: true })
</script>

<template>
      <div class="flex flex-row w-full justify-between align-middle">
        <AdvancedFilter @filter-applied="handleChangeOperator"/>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button size="sm">
                <span :class="{ 'hidden lg:inline': true }">Select Columns</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem 
                v-for="column in table.getAllLeafColumns()" 
                class="capitalize"
                :key="column.id"
                v-model="checkedColumns[column.id]" 
              >
              <FlexRender :render="column.columnDef.header"/>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
          <p>Current Page: {{ page + 1 }} </p>
          <Pagination/>
        </div>
      </div>
</template>