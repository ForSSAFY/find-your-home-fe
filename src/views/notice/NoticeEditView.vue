<script lang="ts" setup>
import { editNotice, getEditNotice } from '@/api/notice';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

interface Notice {
  title: string
  content: string
}

const notice = ref<Notice>()

onMounted(() => {
  const no = route.params.no.toString();
  getEditNotice(no).then(res => notice.value = res.data).catch(console.error)
})

function modify() {
  if (!notice.value) return;
  if (notice.value.title.trim().length < 1) {
    alert("제목을 작성해주세요")
    return;
  }
  if (notice.value.content.trim().length < 1) {
    alert("내용을 작성해주세요")
    return;
  }

  const no = route.params.no.toString();
  editNotice(no, { title: notice.value.title, content: notice.value.content })
    .then(() => router.push({ name: 'list', query: { no } }))
  .catch(err => alert("글 수정 실패! :" + err))
}

</script>
<template>
  <v-container class="container">
    <header class="header">
      <h2>공지사항 - 글수정</h2>
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
      <v-btn @click="modify()">글 수정</v-btn>
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
