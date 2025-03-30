<script setup lang="ts">
import Header from './components/HeaderSlot.vue'
import SidebarProvider from './components/ui/sidebar/SidebarProvider.vue'
import Financeiro from './pages/Financeiro.vue'
</script>

<template>
    <SidebarProvider :default-open="false">
        <!-- problema sendo disfarçado pelo overflow-hidden -->
        <div class="flex flex-col overflow-auto h-screen w-screen">
            <Header/>
            <main class="flex-1 max-h-full flex-grow">
                <section class="grid items-center p-8 gap-2">
                    <Financeiro/>
                </section>
            </main>
        </div>
    </SidebarProvider>
</template>

