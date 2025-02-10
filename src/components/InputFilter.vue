<script setup lang="ts">
import { Input } from '../../@/components/ui/input'
import { table } from '../utils/table'

const props = defineProps<{
  accessorKey: string
}>()
</script>

<template>
    <Input
        class="w-1/8 h-2/3"
        type="text"
        :value="table.getColumn(props.accessorKey)?.getFilterValue() as string"
        @input="table.getColumn(props.accessorKey)?.setFilterValue(($event.target as HTMLInputElement).value)"
    />
</template>