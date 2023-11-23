<script lang="ts" setup>
import { writeNotice } from '@/api/notice'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface WriteNoticeReq {
  title: string
  content: string
}

const writeNoticeReq = ref<WriteNoticeReq>({
  title: '',
  content: ''
})

function post() {
  if (writeNoticeReq.value.title.trim().length < 1) {
    alert('제목을 작성해주세요.')
    return
  }
  if (writeNoticeReq.value.content.trim().length < 1) {
    alert('내용을 작성해주세요')
    return
  }

  writeNotice(writeNoticeReq.value)
    .then(() => router.push({ name: 'list' }))
    .catch((err) => alert('글 작성 에러!: ' + err))
}
</script>
<template>
  <v-container class="container">
    <header class="header">
      <h2>공지사항 - 글쓰기</h2>
      <div class="header-line"></div>
    </header>
    <div class="content">
      <div>
        <label for="subject" class="form-label">제목 : </label>
        <v-text-field variant="outlined" rounded="0" placeholder="제목..."></v-text-field>
      </div>
      <div>
        <label for="content" class="form-label">내용 : </label>
        <v-textarea variant="outlined" rounded="0" placeholder="내용"></v-textarea>
      </div>
      <v-btn @click="post()">글쓰기</v-btn>
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

/* 글쓰기 폼 */
.content {
  margin-top: 2rem;
}
</style>
