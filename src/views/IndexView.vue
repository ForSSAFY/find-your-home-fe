<script setup lang="ts">
import HeaderView from '@/components/layout/HeaderView.vue'
import FooterView from '@/components/layout/FooterView.vue'
</script>

<template>
  <HeaderView />
  <div class="wrapper">
    <router-view></router-view>
  </div>
  <FooterView class="footer" />
</template>

<style scoped>
.wrapper {
  height: auto;
  min-height: 96vh;

}
.footer {
  height: 2vh;
  position: relative;
  transform: translateY(-100%);
  text-align: center;
}
</style>
