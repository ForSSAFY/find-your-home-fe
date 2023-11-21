<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
  router.push({ name: 'login' })
}
const findpassword = () => {
  router.push({ name: 'find-pw' })
}
</script>

<template>
  <v-main class="container">
    <form class="find-id-form">
      <header class="header">
        <h2>아이디 찾기</h2>
        <div class="header-line"></div>
      </header>
      <div class="id-part">회원님의 ID는 <span>ssafy</span> 입니다.</div>
      <div class="buttons">
        <v-btn rounded="0" variant="outlined" class="reset-button" @click="findpassword()"
          >비밀번호 찾기</v-btn
        >
        <v-btn rounded="0" class="find-id-button" @click="login()">로그인</v-btn>
      </div>
    </form>
  </v-main>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.find-id-form {
  max-width: 600px;
  width: 100%;
  padding: 4rem;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.38);
}

.header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 2rem;
}

.header h2 {
  font-weight: 700;
  font-size: 40px;
  line-height: 1;
}

.header-line {
  flex: 1 0 0;
  border-bottom: 2px solid black;
}

.font-label {
  font-size: 16px;
  font-weight: 700;
}

.id-part {
  padding: 1rem 0;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.reset-button {
  height: 56px;
}

.find-id-button {
  height: 56px;
  background-color: black;
  color: white;
}
</style>
