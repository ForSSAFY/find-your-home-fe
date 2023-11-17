<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
    <router-view />
  </v-layout>
</template>

<style>
html {
  overflow-y: auto !important;
}

html > body {
  font-family: 'Pretendard Variable';
}
</style>
