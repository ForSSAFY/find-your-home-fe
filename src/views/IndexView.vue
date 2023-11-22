<script setup lang="ts">
import HeaderView from '@/components/layout/HeaderView.vue'
import FooterView from '@/components/layout/FooterView.vue'
</script>

<template>
  <v-layout class="layout">
    <HeaderView />
    <v-main class="main">
      <router-view></router-view>
      <div class="filler"></div>
      <FooterView />
    </v-main>
  </v-layout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex-direction: column;
}

.filler {
  flex: 1 0;
  min-height: 10rem;
}
</style>
