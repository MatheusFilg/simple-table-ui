<script setup lang="ts">
import { columnFilters, table } from '@/utils/table';
import { ref, watch } from 'vue';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const emit = defineEmits(['filter-applied'])

const inputValue = ref('')
const joinValue = ref('')
const columnValue = ref('')

const columnOperators = table.getFlatHeaders()
const joinOperators = ref([
    { index: 1, label: "Contains", value: "ilike" as const },
    { index: 2, label: "Does not contain", value: "notIlike" as const },
    { index: 3, label: "Is", value: "eq" as const },
    { index: 4, label: "Is not", value: "ne" as const },
    { index: 5, label: "Is Empty", value: "isNull" as const },
    { index: 6, label: "Is Not Empty", value: "isNotNull" as const },
])

function handleApplyFilter() {
    if(columnValue.value) {
        columnFilters.value = [{
            id: columnValue.value,
            value: inputValue.value
      }]
    emit('filter-applied', joinValue.value)
    }
}

watch([inputValue, joinValue, columnValue], () => {
  handleApplyFilter()
})

const handleAddFilter = () => {
  columnFilters.value.push({
    id: columnValue.value,
    value: inputValue.value
  })
}

const handleResetFilter = () => {
  columnFilters.value = []
}
</script>

<template>
    <div class="mb-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Filters
              {{ columnFilters.length > 0 ? columnFilters.length : '' }}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" class="w-[496px]">
            <div class="flex gap-6 flex-col">
              <h3 class="font-bold">{{ columnFilters.length > 0 ? 'Filters' : 'No Filters Applied'}}</h3>
              
              <div class="flex gap-1 items-center">
                <!-- Div para a primeira parte do filtro -->
                <div class="min-w-[4.5rem] text-center">
                    <p class="text-muted-foreground text-base">
                        Where
                    </p>
                </div>

                <!-- Segunda Parte do Filtro -->
                <div>
                    <Select v-model="columnValue">
                        <SelectTrigger>
                            <SelectValue class="capitalize" placeholder="Select a Column" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem  
                                v-for="columnOperator in columnOperators" :key="columnOperator.index" :value="columnOperator.column.id" 
                                :class="`${columnOperator.column.getCanFilter() ? '' : 'hidden'}`"
                                class="capitalize"
                            >
                                {{ columnOperator.column.id }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <!-- Terceira Parte do Filtro -->
                <div>
                    <Select v-model="joinValue">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Join" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem v-for="joinOperator in joinOperators" :key="joinOperator.index" :value="joinOperator.value">
                                {{ joinOperator.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <!-- Quarta Parte do Filtro -->
                <div>
                    <Input
                        v-model="inputValue"
                        type="text"
                    />
                </div>
            </div>
              
              <div class="flex gap-1">
                <Button 
                  size="sm"
                  @click="handleAddFilter"
                >
                  Add Filter
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  v-if="columnFilters.length > 0" :onclick="handleResetFilter"
                >
                  Reset Filters
                </Button>
              </div>

            </div>
          </PopoverContent>
        </Popover>
      </div>
</template>
