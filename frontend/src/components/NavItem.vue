<script setup>
    const props = defineProps({
        display: {
            type: String,
            required: true
        }, link: {
            type: String,
            required: true
        }, mobile: {
            type: Boolean,
            default: false
        } 
    })
</script>


<template>
    <a 
      :href="props.link" 
      :class="[
        'text-white font-bold bg-amber-400 rounded hover:bg-yellow-600 transition shadow-sm',
        props.mobile 
          ? 'w-full py-3 px-4 flex justify-center items-center text-base' 
          : 'px-4 py-2 flex justify-center items-center text-sm lg:text-base whitespace-nowrap'
      ]"
    >
        {{ props.display }}
    </a>
</template>