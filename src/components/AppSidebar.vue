<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarFooter,
} from '@/components/ui/sidebar'

import { table } from '../utils/table'

import InputFilter from './InputFilter.vue'

import { FlexRender } from '@tanstack/vue-table'
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
            class="w-full"
            v-if="header.column.getCanFilter()"
            :accessorKey="header.column.id" 
            :placeholder="`Filtrar por... ${header.column.columnDef.id}`"  
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