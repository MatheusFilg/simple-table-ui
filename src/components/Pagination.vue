<script setup lang="ts">
import { ref } from 'vue';
import { table } from '../utils/table';
import Button from './ui/button/Button.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

 const pageSizes = ref([10, 25, 50, 100])
 
function handlePageSizeChange(e: Event) {
  const target = e.target as HTMLSelectElement
  table.setPageSize(Number(target.value))
}
</script>

<template>
  <div class="mt-1 flex gap-2 flex-row justify-center">
    <div class="flex flex-row items-center gap-1">
      <p class="min-w-fit font-semibold">Rows per page</p>
      <Select v-model="table.getState().pagination.pageSize" @v-model="handlePageSizeChange">
        <SelectTrigger>
          <SelectValue placeholder="Select a Size"/>
        </SelectTrigger>
        
        <SelectContent>
          <SelectItem v-for="(pageSize, index) in pageSizes" :value="pageSize" :key="index">
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button
      variant="outline"
      class="duration-250 cursor-pointer"
      :disabled="!table.getCanPreviousPage()"
      @click="() => table.setPageIndex(0)"
    >
      First Page
    </Button>

    <Button
      variant="outline"
      class="duration-250 cursor-pointer"
      :disabled="!table.getCanPreviousPage()"
      @click="() => table.previousPage()"
    >
      Previous
    </Button>

    <Button
      variant="outline"
      class="duration-250 cursor-pointer"
      :disabled="!table.getCanNextPage()"
      @click="() => table.nextPage()"
    >
      Next
    </Button>

    <Button
      variant="outline"
      class="duration-250 cursor-pointer"
      :disabled="!table.getCanNextPage()"
      @click="() => table.setPageIndex(table.getPageCount() - 1)"
    >
      Last Page
    </Button>
  </div>
</template>
