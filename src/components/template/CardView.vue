<script setup lang="ts">
const news = defineProps < { title: string, subtitle: string, imgurl: string }
>()
</script>

<template>
  <v-card class="pa-5">
    <v-img :src="news.imgurl" cover></v-img>

    <v-card-title> {{ news.title }} </v-card-title>

    <v-card-subtitle> {{ news.subtitle }} </v-card-subtitle>
  </v-card>
</template>

<style scoped></style>
