<script setup lang="ts">
const news = defineProps<{ title: string; description: string; imgurl: string; href: string }>()
</script>

<template>
  <v-col>
    <v-card :href="href" class="article" rounded="0">
      <div class="aricle-container">
        <v-img  class="article-img" :src="news.imgurl" cover></v-img>

        <div class="article-text">
          <v-card-title class="article-title"> {{ news.title }} </v-card-title>
          <v-card-subtitle class="article-desc">{{ news.description }}</v-card-subtitle>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<style scoped>
.article {
  padding: 0.5rem 0.5rem;
}

.article:hover {
  background-color: rgb(204, 204, 204, 0.38);
}

.aricle-container {
  display: flex;
  align-items: center;
}

.article-img{
  width: 10rem;
  height: 6rem;
}

.article-text {
  text-decoration: none;
}

.article-title{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.article-desc {
  width: 1000px;
  /* 텍스트 말줄임표 */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
