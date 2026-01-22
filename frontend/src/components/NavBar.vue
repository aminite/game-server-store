<script setup>
  import NavItem from './NavItem.vue';
  const items = [
    {display: "Home", link: "/"},
    {display: "Store", link: "/store"},
    {display: "Profile", link: "/profile"},
    {display: "Login", link: "/login"},
    {display: "Register", link: "/register"}
  ]
</script>

<template>
  <div class="w-full h-18 bg-gray-800 flex justify-center items-center gap-8">
    <template v-for="item in items">
      <NavItem :display="item.display" :link="item.link"/>
    </template>
  </div>
</template>