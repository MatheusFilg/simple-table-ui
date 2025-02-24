<script setup lang="ts">
import FirstTable from './components/FirstTable.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import AppSidebar from './components/AppSidebar.vue'
import SidebarProvider from './components/ui/sidebar/SidebarProvider.vue'
import SidebarTrigger from './components/ui/sidebar/SidebarTrigger.vue'

</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main>
            <SidebarTrigger />
            <div class="flex flex-col gap-4">
                <ThemeToggle />
                <FirstTable />
            </div>
        </main>
    </SidebarProvider>
</template>

