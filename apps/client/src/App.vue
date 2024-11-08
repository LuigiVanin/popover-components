<script setup lang="ts">
import { MyBrandButton } from "@popover/ui";

import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="mx-2 mt-2 rounded-lg bg-red-200 p-5">
    aaa
    <HelloWorld msg="Vite + Vue" />
    <MyBrandButton>Teste</MyBrandButton>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
