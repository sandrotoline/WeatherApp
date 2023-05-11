<template>
    <div class="flex py-3 px-3 bg-blue-950/50 rounded-sm cursor-pointer transition ease-in-out hover:bg-blue-900 ">
        {{ city.city }}, {{ city.country }}
    </div>
</template>

<script setup>
defineProps({
    city:{
        type: Object,
        default: () => {},
    }
})
</script>
