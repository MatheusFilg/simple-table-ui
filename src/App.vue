<script setup lang="ts">
import FirstTable from './components/FirstTable.vue'
import Header from './components/Header.vue'
import SidebarProvider from './components/ui/sidebar/SidebarProvider.vue'
</script>

<template>
    <SidebarProvider :default-open="false">
        <!-- problema sendo disfarçado pelo overflow-hidden -->
        <div class="flex flex-col overflow-auto h-screen w-screen">
            <Header/>
            <main class="flex-1 max-h-full flex-grow">
                <section class="grid items-center p-8 gap-2">
                    <FirstTable />
                </section>
            </main>
        </div>
    </SidebarProvider>
</template>

