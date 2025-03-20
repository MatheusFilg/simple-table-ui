<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { FlexRender } from '@tanstack/vue-table'
import { useQuery as useGraphqlQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Filter } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { getUsersQueryOptions } from '../queryOptions/get-users'
import { filters, page, sorting, table, users } from '../utils/table'
import AppSidebar from './AppSidebar.vue'
import Pagination from './Pagination.vue'
import Button from './ui/button/Button.vue'
import { useSidebar } from './ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

//Caso a API retorne informações de paginação, é possivel consumir
// const pageCount = computed(() => userData.value?.total_pages || 0)
// const totalItems = computed(() => userData.value?.total || 0)
const { data: userData } = useQuery(
  getUsersQueryOptions(page, sorting, filters)
)

watchEffect(() => {
  if (userData.value) {
    users.value = userData.value
    // total_itens.value = userData.value.total_itens
  }
})

const sidebarStatus = ref<boolean>(false)
const activeFilterHeaderId = ref<string | null>(null)

const { toggleSidebar, state } = useSidebar()

function handleFilter(columnId: string) {
  activeFilterHeaderId.value = columnId

  if (state.value === 'collapsed' || state.value === 'expanded') {
    toggleSidebar()
  }
  sidebarStatus.value = state.value === 'expanded'
}


const { result } = useGraphqlQuery(gql`
  query getUsers {
  userTableSingle {
    id
    firstName
    lastName
    email
  }
}
`)

console.log(result)

</script>

<template>
      <div class="w-full overflow-auto border rounded">
        <Table class="w-full relative overflow-auto">
          <TableHeader class="[&_tr]:border-b">
            <TableRow class="border-b">
              <TableHead 
                v-for="header in table.getFlatHeaders()"
                :key="header.id"
                :style="`width: ${header.getSize()}px`"
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
  
                  <Button 
                    v-if="header.column.getCanFilter()"
                    @click="handleFilter(header.column.id)"  
                    variant="outline"
                    class="h-7 w-7 p-1.5"
                  >
                    <Filter :size="20" />
                  </Button>
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
                  :style="`width: ${cell.column.getSize()}px`"
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()" 
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div class="flex justify-center">
        <div class="flex items-center justify-between w-full">
          <div>
            <p>Current Page: {{ page }} </p>
          </div>
          <Pagination/>
        </div>
      </div>
    <AppSidebar 
      :isSidebarOpen="sidebarStatus" 
      :activeFilterHeaderId="activeFilterHeaderId" 
    />
</template>