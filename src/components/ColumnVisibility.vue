<script setup lang="ts">
import { FlexRender } from '@tanstack/vue-table';
import { onMounted, ref, watch } from 'vue';
import { columnVisibility, table } from '../utils/table';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from './ui/dropdown-menu';

const checkedColumns = ref<Record<string, boolean>>({})

onMounted(() => {
  table.getAllLeafColumns().map(column => {
    checkedColumns.value[column.id] = column.getIsVisible()
  })
})

watch(checkedColumns, (newVal) => {
  columnVisibility.value = { ...newVal }
}, { deep: true })
</script>

<template>
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button size="sm">
                <span>Select Columns</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem 
                    v-model="checkedColumns[column.id]" 
                    v-for="column in table.getAllLeafColumns()" 
                    class="capitalize"
                    :key="column.id"
                >
                    <FlexRender :render="column.columnDef.header"/>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>


