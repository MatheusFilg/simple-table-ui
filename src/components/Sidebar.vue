<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'

import { table } from '../utils/table'

import { nextTick, watchEffect } from 'vue'
import SelectFilter from './SelectFilter.vue'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { Button } from './ui/button'

const props = defineProps<{
  isSidebarOpen: boolean
  activeFilterHeaderId?: string | null
}>()

watchEffect(async () => {
  if (props.isSidebarOpen && props.activeFilterHeaderId) {
    // \/ assegurando que a dom vai estar atualizada
    await nextTick()
    const inputId = `${props.activeFilterHeaderId}`
    document.getElementById(inputId)?.focus()
  }
})

const formSchema = toTypedSchema(
  z.object({
    firstName: z.string().array().optional(),
    lastName: z.string().array().optional(),
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(values => {
  // ver uma maneira de verificar aqui qual filtro ta sendo feito e enviar
  if (values.firstName) {
    table.getColumn('firstName')?.setFilterValue(`${values.firstName}`)
  }
  if (values.lastName) {
    table.getColumn('lastName')?.setFilterValue(`${values.lastName}`)
  }
})
</script>

<template>
  <Sidebar variant="floating" side="right">
      <SidebarHeader>
        <h1>Filtros</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <form class="w-2/3 space-y-6" @submit="onSubmit">
              <SelectFilter filterId="firstName" />
              <SelectFilter filterId="lastName" />
              <SelectFilter filterId="email" />
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