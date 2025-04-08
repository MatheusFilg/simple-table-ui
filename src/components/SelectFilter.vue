<script setup lang="ts">
import type { User } from '@/types/users'
import { ref } from 'vue'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { queryAllEmail } from '@/graphql/queries/user/getAllEmails'
import { queryAllFirstName } from '@/graphql/queries/user/getAllFirstNames'
import { queryAllLastName } from '@/graphql/queries/user/getAllLastNames'
import { useLazyQuery } from '@vue/apollo-composable'

const props = defineProps<{
  filterId: string
}>()

const selectOptions = ref<User[]>([])
const isOpen = ref(false)

// utilizar condicional p de acordo com a prop passada ele fazer uma
// determinada query e mudar o valor ? (Inviavel com muitos filtros)
// Poderia ser diferente se tivesse como passar um variavel para a query com o nome da coluna que ta sendo filtrada
const { load: loadFirstNames, onResult: onFirstNamesResult } = useLazyQuery<{ userTable: User[] }>(queryAllFirstName)
const { load: loadLastNames, onResult: onLastNamesResult } = useLazyQuery<{ userTable: User[] }>(queryAllLastName)
const { load: loadEmails, onResult: onEmailResult } = useLazyQuery<{ userTable: User[] }>(queryAllEmail)

onFirstNamesResult((result) => {
  if (result.data) {
    selectOptions.value = result.data.userTable
  }
})

onLastNamesResult((result) => {
  if (result.data) {
    selectOptions.value = result.data.userTable
  }
})

onEmailResult((result) => {
  if (result.data) {
    selectOptions.value = result.data.userTable
  }
})

const loadData = () => {
  switch (props.filterId) {
    case 'firstName':
      loadFirstNames()
      break

    case 'lastName':
      loadLastNames()
      break

    case 'email':
      loadEmails()
      break

    default:
      break;
  }
}
const handleOpenChange = (open: boolean) => {
  isOpen.value = open
  // prestar atenção nessa condição do and caso nao esteja carregando
  if (open && selectOptions.value.length === 0) {
    loadData()
  }
}
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.filterId">
    <FormItem>
      <FormLabel>{{ props.filterId }}</FormLabel>
      <Select multiple v-bind="componentField" :open="isOpen" @update:open="handleOpenChange" >
        <FormControl>
          <SelectTrigger>
            <SelectValue  placeholder="Select a value" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="options in selectOptions" 
              v-if="props.filterId === 'firstName'"
              :value="options.firstName" 
              :key="options.id"
            >
              {{  options.firstName }}
            </SelectItem>

            <SelectItem 
              v-for="options in selectOptions" 
              v-if="props.filterId === 'lastName'"
              :value="options.lastName" 
              :key="options.id"
            >
              {{  options.lastName }}
            </SelectItem>

            <SelectItem 
              v-for="options in selectOptions" 
              v-if="props.filterId === 'email'"
              :value="options.email" 
              :key="options.id"
            >
              {{  options.email }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  </FormField>
</template>


