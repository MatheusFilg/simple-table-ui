<script setup lang="ts">
import { computed, ref } from 'vue';
import { pagination, table } from '../utils/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import {
Pagination, 
PaginationEllipsis, 
PaginationFirst, 
PaginationLast, 
PaginationNext, 
PaginationPrevious
} from '@/components/ui/pagination'
import { PaginationList, PaginationListItem } from 'reka-ui'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'


 const pageSizes = ref([10, 25, 50, 100])
 const totalItems = ref(100)
 const totalPages = computed(() => {
    return Math.ceil(totalItems.value / pagination.value.pageSize);
});
 
function handlePageSizeChange(e: Event) {
  const target = e.target as HTMLSelectElement
  table.setPageSize(Number(target.value))
}
</script>

<template>
  <div class="mt-1 flex w-full flex-row justify-between">
    <div class="flex flex-row items-center gap-1">
      <p class="min-w-fit font-semibold">Rows per page</p>
      <Select v-model="pagination.pageSize" @v-model="handlePageSizeChange">
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
    <div>
      <Pagination
        :total="totalItems"
        :sibling-count="1"
        :items-per-page="table.getState().pagination.pageSize"
        show-edges
        v-model:page="pagination.pageIndex"
      >
        <PaginationList
          v-slot="{ items }"
          class="flex items-center gap-1 text-muted-foreground dark:text-foreground"
        >
          <PaginationFirst 
            class="w-9 h-9 flex items-center justify-center bg-transparent hover:bg-muted/90 dark:hover:bg-muted/70 transition disabled:opacity-50 rounded-lg"
            @click="pagination.pageIndex = 1"
          >
            <ChevronsLeft />
          </PaginationFirst>
          <PaginationPrevious 
            class="w-9 h-9 flex items-center justify-center bg-transparent hover:bg-muted/90 dark:hover:bg-muted/70 transition mr-4 disabled:opacity-50 rounded-lg"
            @click="pagination.pageIndex = Math.max(1, pagination.pageIndex)"
          >
            <ChevronLeft />
          </PaginationPrevious>

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              class="w-9 h-9 border rounded-lg data-[selected]:!bg-muted data-[selected]:text-primary hover:bg-muted/90 dark:hover:bg-muted/70 transition"
              :value="item.value"
              @click="pagination.pageIndex = item.value"
            >
              {{ item.value }}
            </PaginationListItem>
            <PaginationEllipsis
              v-else
              :key="index + 1"
              class="w-9 h-9 flex items-center justify-center"
            >
              &#8230;
            </PaginationEllipsis>
          </template>
                
          <PaginationNext 
            class="w-9 h-9 flex items-center justify-center disabled:opacity-50 rounded-lg"
            @click="pagination.pageIndex = Math.min(totalPages, pagination.pageIndex)"
          >
            <ChevronRight/>
          </PaginationNext>
          <PaginationLast 
            class="w-9 h-9 flex items-center justify-center disabled:opacity-50 rounded-lg"
            @click="pagination.pageIndex = totalPages"
          >
            <ChevronsRight/>
          </PaginationLast>
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
