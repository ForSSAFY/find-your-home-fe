<script setup lang="ts">
import { ref } from 'vue'
const icons = ref(['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'])
</script>

<template>
  <footer>
    <v-footer class="text-center d-flex flex-column">
      <div>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="text"></v-btn>
      </div>
      <v-divider></v-divider>
      <div>©{{ new Date().getFullYear() }} — <strong>Find Your Home</strong>  | All Rights Reserved</div>
    </v-footer>
  </footer>
</template>

<style scoped></style>
