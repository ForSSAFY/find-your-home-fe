<script setup lang="ts">
import HeaderView from '@/components/layout/HeaderView.vue'
import FooterView from '@/components/layout/FooterView.vue'
</script>

<template>
    <HeaderView />
    <v-main class="main">
      <router-view></router-view>
      <div class="filler"></div>
      <FooterView />
    </v-main>
</template>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
  }

  .filler {
    flex: 1 0;
  }
</style>
