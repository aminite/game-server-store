<script setup>
    const props = defineProps({
        display: {
            type: String,
            required: true
        }, link: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <a :href="props.link" class="text-white font-bold bg-amber-400 w-18 h-8 flex justify-center items-center shadow-2xs rounded hover:bg-yellow-600 transition">
        {{ props.display}}
    </a>
</template>