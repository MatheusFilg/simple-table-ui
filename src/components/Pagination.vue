<script setup lang="ts">
import { page } from '../utils/table';
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
          :disabled="page === 0"
          @click="handleChangePage(0)"
        >
          First Page
        </Button>

        <Button
          variant="outline"
          class="duration-250 cursor-pointer"
          :disabled="page === 0"
          @click="handleChangePage(page - 1)"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          class="duration-250 cursor-pointer"
          :disabled="page === 4"
          @click="handleChangePage(page + 1)"
        >
          Next
        </Button>

        <Button
          variant="outline"
          class="duration-250 cursor-pointer"
          :disabled="page === 4"
          @click="handleChangePage(4)"
        >
          Last Page
        </Button>
      </div>
</template>
