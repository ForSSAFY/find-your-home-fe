<script setup lang="ts">
const news = defineProps < { title: string, description: string, imgurl: string, href: string }
>()
</script>

<template>
  <a :href="href" class="link">
    <v-img height="15rem" :src="news.imgurl" cover></v-img>

    <v-card-title> {{ news.title }} </v-card-title>

    <v-card-subtitle> {{ news.description }} </v-card-subtitle>
  </a>
</template>

<style scoped>
.link{

}
</style>
