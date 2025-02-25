<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { table } from '../utils/table';

import InputFilter from './InputFilter.vue';

import { FlexRender } from '@tanstack/vue-table';
import { ref, watchEffect } from 'vue';

const input = ref<InstanceType<typeof InputFilter> | null>(null)

watchEffect(() => {
  if(input.value) {
      console.log(input.value, 'AQUII')
      input.value.focus()
  } else{
    console.log('error')
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
            ref="input"
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