<script lang="ts" setup>
import { listNotice } from '@/api/notice'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type NoticeList = {
  no: number
  date: number
  title: string
  contents: string
}[]

const list = ref<NoticeList>([])

onMounted(() => {
  listNotice().then(res=>{list.value = res.data.articles}).catch(console.error)
})

const page = ref(1)
const perPage = 10
const totalNotice = list.value.length
const totalPage = Math.ceil(totalNotice / perPage)

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
    <a
      v-for="n in displayNotices"
      v-bind="n"
      :key="n.title"
      @click="$router.push({ name: 'view', params: { no: n.no } })"
      class="notices"
      style="cursor: pointer"
    >
      <div>{{ n.date }}</div>
      <div>{{ n.title }}</div>
    </a>
    <v-pagination v-model="page" :length="totalPage"></v-pagination>
    <v-btn variant="outlined" @click="$router.push({ name: 'write' })">글쓰기</v-btn>
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

.notices {
  display: flex;
  border-bottom: 2px solid black;
  gap: 20px;
  padding: 1rem;
}
</style>
