<script setup lang="ts">
import { FlexRender } from '@tanstack/vue-table'
import { watchEffect } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { table, page, filters, sorting, users } from '../utils/table'
import { getUsersQueryOptions } from '../queryOptions/get-users'
import { ArrowUpNarrowWide, Filter, ArrowDownWideNarrow } from 'lucide-vue-next'
import InputFilter from './InputFilter.vue'
import Pagination from './Pagination.vue'
import Button from './ui/button/Button.vue'
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue'

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
              <div class="flex flex-row items-center gap-1 text-lg">
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

                <DropdownMenu v-if="header.column.getCanFilter()">
                  <DropdownMenuTrigger as-child>
                    <Button size="icon" variant="outline">
                      <Filter class="h-2 w-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                      <InputFilter class="w-full" :accessorKey="header.column.id" placeholder="Filtrar por..." />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr 
            v-for="row in table.getRowModel().rows" 
            :key="row.id"
          >
            <td 
              class="text-lg"
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
</template>