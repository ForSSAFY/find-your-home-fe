<script lang="ts" setup></script>
<template>
  <v-container class="container">
    <header class="header">
      <h2>공지사항 - 글쓰기</h2>
      <div class="header-line"></div>
    </header>
   
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
</style>
