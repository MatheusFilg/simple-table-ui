<script setup lang="ts">
import { columnFilters, columnVisibility, table } from '@/utils/table';
import { FlexRender } from '@tanstack/vue-table';
import { ListFilter, Trash2 } from 'lucide-vue-next';
import { customAlphabet } from "nanoid";
import { ref, watch } from 'vue';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const emit = defineEmits(['filter-applied', 'condition-applied'])

const idValue = ref('')

const columnOperators = ref()
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
              joinValue: joinValue.value,
              conditionalValue: conditionalValue.value
            }
      }
    }
    emit('filter-applied', joinValue.value)
    emit('condition-applied', conditionalValue.value)
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
      joinValue: joinValue.value,
      conditionalValue: conditionOperators.value[0].value
    },
  })
}

function handleResetFilter() {
  columnFilters.value = []
  columnValue.value = []
  inputValue.value = []
  joinValue.value = []
  conditionalValue.value = []
}

function handleDeleteFilter(filterIndex: string) {
  columnFilters.value = columnFilters.value.filter((item) => item.id !== filterIndex)
}

watch(columnVisibility, () => {
    columnOperators.value = table.getVisibleFlatColumns()
  })

watch([columnValue.value,joinValue.value,inputValue.value, conditionalValue.value],() => {
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
        <PopoverContent align="start" class="min-w-fit">
          <div class="flex gap-4 flex-col">
            <h3 class="font-bold">{{ columnFilters.length > 0 ? 'Filters' : 'No Filters Applied'}}</h3>
             
            <div 
              class="flex gap-1 items-center" 
              v-for="(columnFilter, index) in columnFilters"
              :key="index"
            >
              <!-- Div para a primeira parte do filtro -->
              <div class="text-center">
                <p class="min-w-16 text-muted-foreground text-base" v-if="index === 0">
                  Where
                </p>
                <div class="min-w-16 " v-else>
                  <!-- :defaultValue="conditionOperators[0].value" -->
                  <Select v-model="conditionalValue[index]" >
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem 
                        v-for="conditionOperator in conditionOperators" 
                        :key="conditionOperator.index" 
                        :value="conditionOperator.value"
                      >
                        {{ conditionOperator.label }}
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
                      :key="columnOperator.id" 
                      :value="columnOperator.id" 
                      :class="`${columnOperator.getCanFilter() ? '' : 'hidden'}`"
                      class="capitalize"
                    >
                    <FlexRender
                      :render="columnOperator.columnDef.header" 
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
              <div class="min-w-28">
                <Input
                  v-model="inputValue[index]"
                  placeholder="Search a Value"
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
