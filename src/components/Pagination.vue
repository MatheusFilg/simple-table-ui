<script setup lang="ts">
import { page, table } from '../utils/table';
import Button from './ui/button/Button.vue';

function handleChangePage(currentPage: number) {
  page.value = currentPage
}
</script>

<!-- trazer o total itens do table e utilizar no disabled -->
<template>
    <div class="mt-1 flex gap-2 flex-row justify-center">
        <Button
          variant="outline"
          class="duration-250 cursor-pointer"
          :disabled="page === 1"
          @click="handleChangePage(1)"
        >
          First Page
        </Button>

        <Button
          variant="outline"
          class="duration-250 cursor-pointer"
          :disabled="page === 1"
          @click="handleChangePage(page - 1)"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          class="duration-250 cursor-pointer"
          :disabled="!table.getCanNextPage()"
          @click="handleChangePage(page + 1)"
        >
          Next
        </Button>

        <Button
          variant="outline"
          class="duration-250 cursor-pointer"
          :disabled="page === 5"
          @click="handleChangePage(5)"
        >
          Last Page
        </Button>
      </div>
</template>
