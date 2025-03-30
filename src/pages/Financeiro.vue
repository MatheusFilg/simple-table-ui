<script setup lang="ts">
import FirstTable from '@/components/TableSlot.vue'
import { ref } from 'vue'
import { useSidebar } from '../components/ui/sidebar'
import AppSidebar from '../components/Sidebar.vue'

const activeFilterHeaderId = ref<string | null>(null)

const { toggleSidebar, state } = useSidebar()

const sidebarStatus = ref<boolean>(false)

function handleFilter(columnId: string) {
  activeFilterHeaderId.value = columnId

  if (state.value === 'collapsed' || state.value === 'expanded') {
    toggleSidebar()
  }
  sidebarStatus.value = state.value === 'expanded'
}
</script>

<template>
    <div>
        <FirstTable :filterFunction="handleFilter" />
        <AppSidebar 
            :isSidebarOpen="sidebarStatus" 
            :activeFilterHeaderId="activeFilterHeaderId" 
        />
    </div>
</template>
