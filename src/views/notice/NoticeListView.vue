<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const notices = [
  { no: 1, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/09/21) 개정안내' },
  { no: 2, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/08/21) 개정안내' },
  { no: 3, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/07/21) 개정안내' },
  { no: 4, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/06/21) 개정안내' },
  { no: 5, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/05/21) 개정안내' },
  { no: 6, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/04/21) 개정안내' },
  { no: 7, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/03/21) 개정안내' },
  { no: 8, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/02/21) 개정안내' },
  { no: 9, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/01/21) 개정안내' },
  { no: 10, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/12/21) 개정안내' },
  { no: 11, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/11/21) 개정안내' },
  { no: 12, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/10/21) 개정안내' },
  { no: 13, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/09/21) 개정안내' },
  { no: 14, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/08/21) 개정안내' },
  { no: 15, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/07/21) 개정안내' },
  { no: 16, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/06/21) 개정안내' },
  { no: 17, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/05/21) 개정안내' },
  { no: 18, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/04/21) 개정안내' },
  { no: 19, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/03/21) 개정안내' },
  { no: 20, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/02/21) 개정안내' },
  { no: 21, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2022/01/21) 개정안내' },
  { no: 22, date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2021/12/21) 개정안내' }
]

const page = ref(1)
const perPage = 10
const totalNotice = notices.length
const totalPage = Math.ceil(totalNotice / perPage)

const displayNotices = computed(() => {
  const start = (page.value - 1) * perPage
  return notices.slice(start, start + perPage)
})
</script>
<template>
  <v-container class="container">
    <header class="header">
      <h2>공지사항</h2>
      <div class="header-line"></div>
    </header>
    <div v-for="n in displayNotices" :key="n.title" class="notices">
      <div>{{ n.date }}</div>
      <div>{{ n.title }}</div>
    </div>
    <v-pagination v-model="page" :length="totalPage"></v-pagination>
    <v-btn variant="outlined" @click="$router.push({name:'write'})">글쓰기</v-btn>
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
