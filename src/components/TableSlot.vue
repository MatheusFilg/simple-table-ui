<script setup lang="ts">
// import type { User } from '@/types/users'
import { FlexRender } from '@tanstack/vue-table'
import { useQuery } from '@vue/apollo-composable'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { columnFilters, getGraphQLFilters, page, sorting, table, users } from '../utils/table'
import Pagination from './Pagination.vue'

import { queryAllData } from '@/graphql/queries/data'
import type { Data } from '@/types/data'
import AdvancedFilter from './AdvancedFilter.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

const operatorValue = ref('')
      
const { result, error } = useQuery<{ dados: Data[] }>(
  // queryAllUsers,
  queryAllData,
  () => ({
    // a medida que a página vai passando eu vou dando skip de acordo com a quantidade do limit
    offset: page.value * 20,
    limit: 20,
    orderBy: sorting.value.reduce(
      (acc, sort, idx) => {
        acc[sort.id] = {
          direction: sort.desc ? 'desc' : 'asc',
          priority: idx + 1,
        }
        return acc
      },
      {} as Record<string, { direction: 'asc' | 'desc'; priority: number }>
    ),
    where: columnFilters.value.length > 0 ? getGraphQLFilters(operatorValue.value) : {},
  }),
  {fetchPolicy: 'cache-first'}
)

watchEffect(() => {
  if (result.value) {
    users.value = result.value.dados
  }
})

function handleChangeOperator(filter: string) {
  operatorValue.value = filter
}

// const {result: dataResult } = useQuery(queryAllData)
</script>

<template>
  <!-- {{ console.log(dataResult) }} -->
      <AdvancedFilter @filter-applied="handleChangeOperator"/>
      <div class="w-full overflow-auto border rounded h-[75vh]">
        <div v-if="error" class="text-red-500">Erro: {{ error.message }}</div>
        <Table class="w-full relative overflow-auto">
          <TableHeader class="[&_tr]:border-b">
            <TableRow class="border-b">
              <TableHead 
                v-for="header in table.getFlatHeaders()"
                :key="header.id"
                class="h-10 px-2 text-base"
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
          
          <TableBody class="[&_tr:last-child]:border-0">
            <TableRow 
              class="text-sm font-medium border-b transition-colors hover:bg-muted/50"
              v-for="row in table.getRowModel().rows" 
              :key="row.id"
            >
              <TableCell 
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="px-2 py-1"
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