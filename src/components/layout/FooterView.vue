<script setup lang="ts">
</script>

<template>
  <v-footer class="my-footer">
    <div>©{{ new Date().getFullYear() }} — <strong>Find Your Home</strong> | All Rights Reserved</div>
  </v-footer>
</template>

<style scoped>
.my-footer {
  display: flex;
  justify-content: center;
  padding: 3rem;
  font-weight: 600;
  font-size: 20px;
}
</style>
