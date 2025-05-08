<script setup lang="ts">
import { columnFilters, table } from '@/utils/table';
import { FlexRender } from '@tanstack/vue-table';
import { ListFilter, Trash2 } from 'lucide-vue-next';
import { customAlphabet } from "nanoid";
import { ref, watch } from 'vue';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const emit = defineEmits(['filter-applied'])

const idValue = ref('')

const columnOperators = table.getFlatHeaders()
const columnValue = ref([])
const inputValue = ref<string[]>([])

const joinOperators = ref([
    { index: 1, label: "Contains", value: "like" as const },
    { index: 2, label: "Does not contain", value: "notLike" as const },
    { index: 3, label: "Is", value: "equals" as const },
    { index: 4, label: "Is not", value: "notEquals" as const },
    { index: 5, label: "Is Empty", value: "isNull" as const },
    { index: 6, label: "Is Not Empty", value: "isNotNull" as const },
])
const joinValue = ref([])

const conditionOperators = ref([
  { index: 1, label: "And", value: "and" as const },
  { index: 2, label: "Or", value: "or" as const },
])
const conditionalValue = ref([])

function handleApplyFilter(index: number) {
    if(inputValue.value[index] !== undefined && inputValue.value[index] !== '') {
        columnFilters.value[index] = {
            id: columnFilters.value[index].id || idValue.value,
            value: {
              columnValue: columnValue.value,
              inputValue: inputValue.value,
              joinValue: joinValue.value
            }
      }
    }
    emit('filter-applied', joinValue.value)
}

function handleAddFilter() {
  idValue.value = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      6
    )()
  columnFilters.value.push({
    id: idValue.value,
    value: {
      columnValue: columnValue.value,
      inputValue: inputValue.value,
      joinValue: joinValue.value
    },
  })
}

function handleResetFilter() {
  columnFilters.value = []
  columnValue.value = []
  inputValue.value = []
  joinValue.value = []
}

function handleDeleteFilter(filterIndex: string) {
  columnFilters.value = columnFilters.value.filter((item) => item.id !== filterIndex)
}

watch([columnValue.value,joinValue.value,inputValue.value],() => {
  columnFilters.value.map((_, index) => { handleApplyFilter(index) })
})
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
              :style="`display:${columnFilters.length > 0 ? 'flex' : 'none'}`"
              >
              {{ columnFilters.length > 0 ? columnFilters.length : '' }}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" class="w-[496px]">
          <div class="flex gap-4 flex-col">
            <h3 class="font-bold">{{ columnFilters.length > 0 ? 'Filters' : 'No Filters Applied'}}</h3>
             
            <div 
              class="flex gap-1 items-center" 
              v-for="(columnFilter, index) in columnFilters"
              :key="index"
            >
              <!-- Div para a primeira parte do filtro -->
              <div class="min-w-[4.5rem] text-center h-fit">
                <p class="text-muted-foreground text-base" v-if="index === 0">
                  Where
                </p>
                <div v-else>
                  <Select>
                    <SelectTrigger v-model="conditionalValue">
                      <SelectValue placeholder="Select a Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem 
                        v-for="conditionOperator in conditionOperators" 
                        :key="conditionOperator.index" 
                        :value="conditionOperator.value"
                      >
                        {{ conditionOperator.value }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Segunda Parte do Filtro -->
              <div>
                <Select v-model="columnValue[index]">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Column" class="capitalize" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="columnOperator in columnOperators" 
                      :key="columnOperator.index" 
                      :value="columnOperator.column.id" 
                      :class="`${columnOperator.column.getCanFilter() ? '' : 'hidden'}`"
                      class="capitalize"
                    >
                    <FlexRender
                      :render="columnOperator.column.columnDef.header" 
                      :props="columnOperator.getContext()"
                    />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Terceira Parte do Filtro -->
              <div>
                <Select v-model="joinValue[index]">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Join" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem 
                      v-for="joinOperator in joinOperators" 
                      :key="joinOperator.index" 
                      :value="joinOperator.value"
                    >
                      {{ joinOperator.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Quarta Parte do Filtro -->
              <div>
                <Input
                  v-model="inputValue[index]"
                  type="text"
                />
              </div>

              <!-- Quinta Parte do Filtro -->
               <div>
                <Button 
                  variant="destructive"
                  size="icon" 
                  @click="handleDeleteFilter(columnFilter.id)"
                >
                  <Trash2 />
                </Button>
               </div>
            </div>
              
            <div class="flex gap-2">
              <Button 
                size="sm"
                @click="handleAddFilter"
              >
                Add Filter
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                v-if="columnFilters.length > 0" 
                :onclick="handleResetFilter"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
    </Popover>
  </div>
</template>
