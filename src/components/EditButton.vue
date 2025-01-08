<script setup lang="ts">
const props = defineProps({
    id: Number
})

</script>

<template>
    <button>
        Edit {{ props.id }}
    </button>
</template>



