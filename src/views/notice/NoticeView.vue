<script lang="ts" setup>
import { deleteNotice, getNotice } from '@/api/notice'
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Notice {
  id: number
  createdAt: number
  title: string
  content: string
}

const notice = ref<Notice>()

onMounted(() => {
  const id = route.params.id.toString()
  getNotice(id)
    .then((res) => (notice.value = res.data))
    .catch(console.error)
})

function remove() {
  const id = route.params.id.toString()
  deleteNotice(id)
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
      <p class="content-header mt-8" style="font-size: x-large; font-weight: 500;">
        {{ notice.title }}
      </p>
      <div class="content-header" v-if="notice.createdAt">
        <label class="form-label">작성일 : </label>
        <p>{{ notice.createdAt }}</p>
      </div>
      <div style="margin-top: 1rem;">
        <div>{{ notice.content }}</div>
      </div>
      <div class="buttons">
        <v-btn variant="outlined" rounded="0" v-bind="notice" @click="$router.push({ name: 'list' })">글목록</v-btn>
        <v-btn variant="outlined" rounded="0" v-bind="notice"
          @click="$router.push({ name: 'edit', params: { no: notice.id } })">글수정</v-btn>
        <v-btn variant="outlined" rounded="0" @click="remove()">글삭제</v-btn>
      </div>
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
  margin-top: 1rem;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  border-top: 2px solid black;
  padding-top: 1rem;
}
</style>
