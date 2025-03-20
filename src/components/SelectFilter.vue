<script setup lang="ts">
import type { User } from '@/types/users'
import { computed } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { table } from '../utils/table'

// Popula as opções do select pegando os valores diretamente da tabela
const uniqueNamesValue = computed(() => {
  return [...new Set(table.options.data.map((user: User) => user.first_name))]
})

// filtra a tabela atraves de setar os valores diretamente na tabela
// const handleFilter = (selectedNames: AcceptableValue) => {
//   table.getColumn('first_name')?.setFilterValue(selectedNames)
// }
</script>

<template>
  <FormField v-slot="{ componentField }" name="username">
    <FormItem>
      <FormLabel>Name</FormLabel>
      <Select multiple v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a Name" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="names in uniqueNamesValue" :value="names" :key="names">
              {{  names }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormDescription>
        This is your public display name.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>

<!-- 
    <Select multiple @update:model-value="handleFilter">
        <SelectTrigger>
          <SelectValue placeholder="Select a Name" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="names in uniqueNamesValue" :value="names" :key="names">
              {{  names }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> -->
</template>


