<script setup lang="ts">
const news = defineProps<{ title: string; description: string; imgurl: string; href: string }>()
</script>

<template>
  <a :href="href" class="news-card">
    <v-img class="news-img" :src="news.imgurl" cover></v-img>

    <v-card-title> {{ news.title }} </v-card-title>

    <v-card-subtitle> {{ news.description }} </v-card-subtitle>
  </a>
</template>

<style scoped>
.news-card {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: center;
  color: black;
  text-decoration: none;
  transition-duration: 300ms;
}

.news-card:hover {
  box-shadow: 0 10px 20px rgb(0, 0, 0, 0.38);
}

</style>
