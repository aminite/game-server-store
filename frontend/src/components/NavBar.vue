<script setup>
  import { ref } from 'vue';
  import NavItem from './NavItem.vue';
  const items = [
    {display: "Home", link: "/"},
    {display: "Store", link: "/store"},
    {display: "Profile", link: "/profile"},
    {display: "Login", link: "/login"},
    {display: "Register", link: "/register"}
  ]
  const mobileMenuOpen = ref(false);
</script>

<template>
  <nav class="w-full bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-18">
        <div class="shrink-0">
          <span class="text-white font-bold text-xl">Game Server</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-4 lg:gap-8">
          <template v-for="item in items" :key="item.link">
            <NavItem :display="item.display" :link="item.link"/>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-white p-2 rounded-md hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                v-if="!mobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div 
      v-if="mobileMenuOpen"
      class="md:hidden bg-gray-700 px-4 py-3 space-y-2"
    >
      <template v-for="item in items" :key="item.link">
        <NavItem :display="item.display" :link="item.link" :mobile="true"/>
      </template>
    </div>
  </nav>
</template>