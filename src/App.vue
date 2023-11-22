<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <v-layout class="layout">
    <router-view></router-view>
  </v-layout>
</template>

<style>
html>body{
  font-family: 'Pretendard Variable';
}

.layout {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>