<script setup lang="ts">
</script>

<template>
    <v-footer class="my-footer">
      <div>©{{ new Date().getFullYear() }} — <strong>Find Your Home</strong>  | All Rights Reserved</div>
    </v-footer>
</template>

<style scoped>
.my-footer {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 20px;
  flex: 0 0;
}
</style>
