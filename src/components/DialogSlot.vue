<script setup lang="ts">
import { Pin } from 'lucide-vue-next'
import Dialog from './ui/dialog/Dialog.vue'
import DialogTrigger from './ui/dialog/DialogTrigger.vue'
import DialogContent from './ui/dialog/DialogContent.vue'
import Button from './ui/button/Button.vue'
</script>

<template>
    <Dialog>
        <DialogTrigger>
            <Button variant="outline" size="sm">
                <Pin />
            </Button>
        </DialogTrigger>
        <DialogContent>
            Oi
        </DialogContent>
    </Dialog>
</template>


