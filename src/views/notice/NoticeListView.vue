<script lang="ts" setup>
import { listNotice } from '@/api/notice'
import { ref, computed, onMounted } from 'vue'

type NoticeList = {
  id: number
  createdAt: number | null
  title: string
  content: string
}[]

const list = ref<NoticeList>([])

onMounted(() => {
  listNotice()
    .then(res => list.value = res.data)
    .then(console.log)
    .catch(console.error)
})

const page = ref(1)
const perPage = 10
const totalPage = computed(() => Math.ceil(list.value.length / perPage))

const displayNotices = computed(() => {
  const start = (page.value - 1) * perPage
  return list.value.slice(start, start + perPage)
})
</script>
<template>
  <v-container class="container">
    <header class="header">
      <h2>공지사항</h2>
      <div class="header-line"></div>
    </header>
    <router-link v-for="notice in displayNotices" v-bind="notice" :key="notice.title"
      :to="{ name: 'view', params: { id: notice.id } }" class="notice">
      <div>{{ notice.createdAt ?? new Date().toLocaleDateString() }}</div>
      <div>{{ notice.title }}</div>
    </router-link>
    <div style="position: relative; margin-top: 2rem;">
      <v-btn variant="outlined" rounded="0" @click="$router.push({ name: 'write' })"
        style="position: absolute; top: 0.5rem;">글쓰기</v-btn>
      <v-pagination v-model="page" :length="totalPage" />
    </div>
  </v-container>
</template>
<style scoped>
.container {
  max-width: 1200px;
  width: 100%;
}

.header {
  display: flex;
  align-items: start;
  gap: 0.5rem;
}

.header h2 {
  font-weight: 700;
  font-size: 2rem;
  line-height: 1;
}

.header-line {
  display: flex;
  align-items: end;
  justify-content: end;
  padding-bottom: 0.25rem;
  flex: 1 0 0;
  border-bottom: 2px solid black;
  height: 1.85rem;
}

.notice {
  display: flex;
  border-bottom: 2px solid black;
  gap: 3rem;
  padding: 1.5rem 0;
  color: black;
  text-decoration: none;
  font-size: large;
  font-weight: 500;
}
</style>
