<script setup lang="ts">
const news = defineProps<{ title: string; description: string; imgurl: string; href: string }>()
</script>

<template>
  <!-- <v-col> -->
  <v-card variant="flat" :href="href" class="article" rounded="0" hover>
    <v-img class="article-img" :src="news.imgurl" cover></v-img>
    <div class="article-text">
      <v-card-title class="article-title"> {{ news.title }} </v-card-title>
      <div class="article-desc">{{ news.description }}</div>
      <!-- <v-card-subtitle class="article-desc">{{ news.description }}</v-card-subtitle> -->
    </div>
  </v-card>
  <!-- </v-col> -->
</template>

<style scoped>
.article {
  padding: 1rem;
  display: flex;
  align-items: top;
  background-color: transparent;
}

.article-img {
  width: 12rem;
  height: 8rem;
  object-fit: cover;
}

.article-text {
  display: flex;
  flex-direction: column;
  /* 텍스트 말줄임표 */
  text-overflow: ellipsis;
  overflow-x: hidden;
}

.article-desc {
  padding: 0 1rem;
  text-wrap: wrap;
  color: rgba(0, 0, 0, 0.5);
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 3em;
}
</style>
