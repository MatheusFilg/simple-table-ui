<script setup lang="ts">
import type { User } from '@/types/users'
import { ref, watchEffect } from 'vue'
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

import { useQuery } from '@vue/apollo-composable'
import { queryAllFirstName } from '@/graphql/queries/user/getAllFirstNames'

const uniqueNamesValue = ref<User[]>([])
const { result } = useQuery<{ userTable: User[] }>(queryAllFirstName)

const selectFilter = ref()
// mudar para que seja uma lazyQuery que só será chamada ao clicar no select ao invés dessa forma
watchEffect(() => {
  if (result.value) {
    uniqueNamesValue.value = result.value.userTable
  }
})
</script>

<template>
  <FormField v-slot="{ componentField }" name="username">
    <FormItem>
      <FormLabel>Name</FormLabel>
      <Select multiple v-bind="componentField" ref="selectFilter">
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a Name" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem  v-for="names in uniqueNamesValue" :value="names.firstName" :key="names.id">
              {{  names.firstName }}
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
</template>


