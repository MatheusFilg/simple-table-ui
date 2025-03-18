<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'

import { table } from '../utils/table'

import InputFilter from './InputFilter.vue'

import type { User } from '@/types/users'
import { FlexRender } from '@tanstack/vue-table'
import { computed, nextTick, watchEffect } from 'vue'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const props = defineProps<{
  isSidebarOpen: boolean
  activeFilterHeaderId?: string | null
}>()

watchEffect(async () => {
  if (props.isSidebarOpen && props.activeFilterHeaderId) {
    await nextTick()
    const inputId = `${props.activeFilterHeaderId}`
    document.getElementById(inputId)?.focus()
  }
})
function getUniqueValueColumn(columnName: keyof User) {
  return computed(() => {
    const columnId = columnName
    const values = table.getRowModel().rows.map((row) => row.getValue(columnId) as string)

    return [... new Set(values)]
  })
}

const uniqueNamesValue = getUniqueValueColumn('first_name')
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <h1>Filtros</h1>
    </SidebarHeader>
    
    <SidebarContent>
      <SidebarGroup class="flex gap-4">
        <div v-for="header in table.getFlatHeaders()">
          <FlexRender 
            :render="header.column.columnDef.header" 
            :props="header.getContext()"
            v-if="header.column.getCanFilter()"
          />

          <InputFilter
            :id="header.column.id"
            ref="inputRef"
            class="w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            v-if="header.column.getCanFilter()"
            :accessorKey="header.column.id" 
            placeholder="Filtrar por..."  
          />
        </div>
      </SidebarGroup>

      <SidebarGroup>
        <Select multiple>
          <SelectTrigger>
            <SelectValue placeholder="Select a Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <!-- <SelectLabel>First Name</SelectLabel> -->
              <SelectItem v-for="names in  uniqueNamesValue" :value="names" :key="names">
                {{  names }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </SidebarGroup>
      
    </SidebarContent>

    <SidebarFooter >
      <span>footer</span>
    </SidebarFooter>
  </Sidebar>
</template>