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
import { nextTick, watchEffect } from 'vue'
import SelectFilter from './SelectFilter.vue'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Button } from './ui/button'

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

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50).array(),
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(values => {
  // console.log(values.username[0])
  table
    .getColumn('first_name')
    ?.setFilterValue(`${values.username[0]}&${values.username[1]}`)
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

      <SidebarGroup>
        <form class="w-2/3 space-y-6" @submit="onSubmit">
          
          <SelectFilter />

          <Button type="submit">
            Submit
          </Button>
        </form>
        
      </SidebarGroup>
      
    </SidebarContent>

    <SidebarFooter >
      <span>footer</span>
    </SidebarFooter>
  </Sidebar>
</template>