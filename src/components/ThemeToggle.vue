<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue'
import Button from './ui/button/Button.vue'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode({ disableTransition: false })
</script>

<template>
  <div class="w-12">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
          <Icon icon="lucide:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="mode = 'light'">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem @click="mode = 'dark'">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem @click="mode = 'auto'">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  </template>



