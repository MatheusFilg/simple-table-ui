<script setup lang="ts">
import { ref } from 'vue';
import { table } from '../utils/table';
import Input from './ui/input/Input.vue';

const props = defineProps<{
  accessorKey: string
}>()

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  inputRef,
})
</script>

<template>
    <Input
        ref="inputRef"
        class="w-1/8 h-2/3"
        type="text"
        :value="table.getColumn(props.accessorKey)?.getFilterValue() as string"
        @input="table.getColumn(props.accessorKey)?.setFilterValue(($event.target as HTMLInputElement).value)"
    />
</template>