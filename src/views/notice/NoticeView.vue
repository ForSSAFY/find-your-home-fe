<script lang="ts" setup>
import { deleteNotice, getNotice } from '@/api/notice'
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Notice {
  no: number
  date: number
  title: string
  content: string
}

const notice = ref<Notice>()

onMounted(() => {
  const no = route.params.no.toString()
  getNotice(no)
    .then((res) => (notice.value = res.data))
    .catch(console.error)
})

function remove() {
  const no = route.params.no.toString()
  deleteNotice(no)
    .then(() => router.push({ name: 'list' }))
    .catch((err) => alert('글 삭제 실패 (' + err + ')'))
}
</script>
<template>
  <v-container class="container">
    <header class="header">
      <h2>공지사항 - 글보기</h2>
      <div class="header-line"></div>
    </header>
    <div class="content" v-if="notice">
      <div class="content-header">
        <label for="subject" class="form-label">제목 : </label>
        <p>{{ notice.title }}</p>
      </div>
      <div class="content-header">
        <label for="date" class="form-label">날짜 : </label>
        <p>{{ notice.date }}</p>
      </div>
      <div>
        <label for="content" class="form-label">내용 : </label>
        <div>{{ notice.content }}</div>
      </div>
      <v-btn v-bind="notice" @click="$router.push({ name: 'list' })">글목록</v-btn>
      <v-btn v-bind="notice" @click="$router.push({ name: 'edit', params: { no: notice.no } })"
        >글수정</v-btn
      >
      <v-btn @click="remove()">글삭제</v-btn>
    </div>
  </v-container>
</template>
<style scoped>
/* 헤더 */
.container {
  max-width: 800px;
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

/* 콘텐츠 헤더 */
.content-header {
  display: flex;
  gap: 1rem;
}
</style>
