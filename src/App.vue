<script setup lang="ts">
import Header from './components/HeaderSlot.vue';
import Financeiro from './pages/Financeiro.vue';
</script>

<template>
    <div class="flex flex-col overflow-auto h-screen w-screen">
        <Header/>
        <main class="flex-1 flex-grow">
            <section class="grid items-center p-8 gap-2">
                <Financeiro/>
            </section>
        </main>
    </div>
</template>

