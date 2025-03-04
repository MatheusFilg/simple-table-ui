<script setup lang="ts">
import FirstTable from './components/FirstTable.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import SidebarProvider from './components/ui/sidebar/SidebarProvider.vue'
import SidebarTrigger from './components/ui/sidebar/SidebarTrigger.vue'
</script>

<template>
    <SidebarProvider :default-open="false">
        <main class="flex flex-col gap-4 p-4 w-screen">
            <div class="flex flex-row gap-2 items-center">
                <SidebarTrigger />
                <ThemeToggle />
            </div>
            <FirstTable />
        </main>
    </SidebarProvider>
</template>

