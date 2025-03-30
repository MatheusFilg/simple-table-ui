<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
    <header class="w-full border-b border-border sticky z-50 top-0 bg-background/95 backdrop-blur-[2px] supports-backdrop-filter:bg-background/60">
        <div class="flex flex-row items-center gap-2 px-8 py-2">
            <ThemeToggle />
            <h1>Header</h1>
        </div>
    </header>
</template>


