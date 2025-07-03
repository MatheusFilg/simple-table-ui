<script setup lang="ts">
import { columnFilters, columnVisibility, table } from '@/utils/table';
import { FlexRender, type ColumnDefTemplate, type HeaderContext } from '@tanstack/vue-table';
import { ListFilter, Trash2 } from 'lucide-vue-next';
import { customAlphabet } from "nanoid";
import { ref, watch } from 'vue';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface FilterItem {
  id: string;
  column: string;
  operator: string;
  value: string;
}

const emit = defineEmits(['update:filters'])

const props = defineProps<{
  initialFilters?: FilterItem[]
}>()

const filterItems = ref<FilterItem[]>(props.initialFilters || []);

const operators = ref([
    { index: 1, label: "Contains", value: "ilike" as const },
    { index: 2, label: "Does not contain", value: "notIlike" as const },
    { index: 3, label: "Is", value: "eq" as const },
    { index: 4, label: "Is not", value: "ne" as const },
])

const columnOptions = ref<{ id: string; header: ColumnDefTemplate<HeaderContext<{ id: number; email: string; firstName: string; lastName: string; contact: string, profession: string }, unknown>> | undefined; }[]>([])

function addFilter() {
  filterItems.value.push({
    id: customAlphabet("1234567890ABCDEF", 6)(),
    column: '',
    operator: '', 
    value: ''
  });
}

function removeFilter(id: string) {
  filterItems.value = filterItems.value.filter(item => item.id !== id);
}

function resetFilters() {
  filterItems.value = [];
}

function buildWhereObject() {
  const where: Record<string, any> = {};
  
  filterItems.value.map(item => {
    if (!item.column || !item.value) return;
    
    if(item.operator === 'ilike' || item.operator === 'notIlike') {
      where[item.column] = {
      [item.operator]: `%${item.value}%`
    };
    } else {
      where[item.column] = {
      [item.operator]: item.value
    }
    }
  })

  return Object.keys(where).length > 0 ? where : null;
}

watch(filterItems, () => {
  emit('update:filters', {
    filters: filterItems.value,
    where: buildWhereObject()
  });
}, { deep: true });

watch(columnVisibility, () => {
  columnOptions.value = table.getVisibleFlatColumns()
    .filter(column => column.getCanFilter())
    .map(column => ({
      id: column.id,
      header: column.columnDef.header
    }));
}, { immediate: true })
</script>

<template>
  <div class="mb-2">
    <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" class="flex justify-center items-center gap-2">
            <ListFilter />
            Filters
            <span
              class="bg-foreground/20 p-1 h-4 min-w-4 w-fit flex items-center justify-center text-[10px] font-normal rounded"
              :style="`display:${filterItems.length > 0 ? 'flex' : 'none'}`"
              >
              {{ filterItems.length > 0 ? filterItems.length : '' }}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" class="min-w-fit">
          <div class="flex gap-4 flex-col">
            <h3 class="font-bold">{{ filterItems.length > 0 ? 'Filters' : 'No Filters Applied'}}</h3>
             
            <div 
              class="flex gap-1 items-center" 
              v-for="(filter, index) in filterItems"
              :key="filter.id"
            >
              <div class="text-center">
                <p class="min-w-16 text-muted-foreground text-base" v-if="index === 0">
                  Where
                </p>
                <div class="min-w-16 " v-else />
              </div>

              <div>
                <Select v-model="filter.column">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Column" class="capitalize" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="columnOperator in columnOptions" 
                      :key="columnOperator.id" 
                      :value="columnOperator.id" 
                      class="capitalize"
                      >
                    <FlexRender
                      :render="columnOperator.header" 
                    />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select v-model="filter.operator">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Join" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem 
                      v-for="joinOperator in operators" 
                      :key="joinOperator.index" 
                      :value="joinOperator.value"
                    >
                      {{ joinOperator.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="min-w-28">
                <Input
                  v-model="filter.value"
                  placeholder="Search a Value"
                  type="text"
                />
              </div>

               <div>
                <Button 
                  variant="destructive"
                  size="icon" 
                  @click="removeFilter(filter.id)"
                >
                  <Trash2 />
                </Button>
               </div>
            </div>
              
            <div class="flex gap-2">
              <Button 
                size="sm"
                @click="addFilter"
              >
                Add Filter
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                v-if="columnFilters.length > 0" 
                :onclick="resetFilters"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
    </Popover>
  </div>
</template>
