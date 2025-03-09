<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { FlexRender } from '@tanstack/vue-table'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Filter } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { getUsersQueryOptions } from '../queryOptions/get-users'
import { filters, page, sorting, table, users } from '../utils/table'
import Pagination from './Pagination.vue'
import Button from './ui/button/Button.vue'
import { useSidebar } from './ui/sidebar'
import AppSidebar from './AppSidebar.vue'

//Caso a API retorne informações de paginação, é possivel consumir
// const pageCount = computed(() => userData.value?.total_pages || 0)
// const totalItems = computed(() => userData.value?.total || 0)
const { data: userData } = useQuery(
  getUsersQueryOptions(page, sorting, filters)
)

watchEffect(() => {
  if (userData.value) {
    users.value = userData.value
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
</script>

<template>
    <div class="h-[90dvh] flex flex-col">    
      <table class="self-center gap-2 flex flex-col w-">
        <thead>
          <tr>
            <th 
              v-for="header in table.getFlatHeaders()"
              :key="header.id"
              :style="`width: ${header.getSize()}px`"
            >
              <div class="flex flex-row items-center text-lg">
                <div
                  class="flex flex-row items-center gap-1"
                  :class="`${header.column.getCanSort() ? 'cursor-pointer' : 'cursor-default'}`"
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
                  size="icon" 
                >
                  <Filter class="h-2 w-2" />
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr 
            class="text-lg"
            v-for="row in table.getRowModel().rows" 
            :key="row.id"
          >
            <td 
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender 
                :style="`width: ${cell.column.getSize()}px`"
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()" 
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination/>

      <div>
        <p>Current Page: {{ page }} </p>
      </div>
    </div>
    <AppSidebar 
      :isSidebarOpen="sidebarStatus" 
      :activeFilterHeaderId="activeFilterHeaderId" 
    />
</template>