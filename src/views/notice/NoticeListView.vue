<script lang="ts" setup>
const notices = [
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/09/21) 개정안내' },
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/08/21) 개정안내' },
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/07/21) 개정안내' },
  { date: 20231117, title: '[공지] Find your house 개인정보처리방침 (2023/06/21) 개정안내' }
]
</script>
<template>
  <v-container class="container">
    <header class="header mb-6">
      <h2>공지사항</h2>
      <div class="header-line"></div>
    </header>
    <div v-for="n in notices" :key="n.title" class="notices">
      <div>{{ n.date }}</div>
      <div>{{ n.title }}</div>
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

.notices{
  display: flex;
  border-bottom: 2px solid black;
  gap: 20px;
}
</style>
