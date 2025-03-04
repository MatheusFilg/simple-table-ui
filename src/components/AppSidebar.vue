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

import { FlexRender } from '@tanstack/vue-table'
import { watchEffect, nextTick } from 'vue'

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
        <span>grupo 2</span>
    </SidebarContent>

    <SidebarFooter >
      <span>footer</span>
    </SidebarFooter>
  </Sidebar>
</template>