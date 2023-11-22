<script lang="ts" setup>
const today = new Date()
const date = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일'
</script>

<template>
  <v-container class="container">
    <div class="header">
      <h2>오늘의 뉴스</h2>
      <div class="header-more-box">
        <div>{{ date }}</div>
      </div>
    </div>
    
  </v-container>
</template>

<style scoped>
.container {
  max-width: 1200px;
  width: 100%;
  flex-direction: column;
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
}

/* 헤더 */
.header {
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.header h2 {
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
}

.header-more-box {
  /* (grow, shrink, basis) */
  display: flex;
  justify-content: end;
  flex: 1 0 0;
  border-bottom: 2px solid black;
}
</style>
