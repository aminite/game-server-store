<script setup>
    import NavBar from './components/NavBar.vue';
</script>

<template>
    <NavBar />
    <router-view />
</template>

<style>
    body {
      background-color: var(--color-gray-900);  
    }
</style>