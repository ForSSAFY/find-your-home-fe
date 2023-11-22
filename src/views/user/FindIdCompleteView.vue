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
  <v-layout>
    <v-main class="container">
      <form class="find-id-form">
        <header class="header mb-6">
          <h2>아이디 찾기</h2>
          <div class="header-line"></div>
        </header>

        <div class="id-part">회원님의 ID는 <strong>ssafy</strong> 입니다.</div>
        <div class="buttons">
          <v-btn rounded="0" variant="outlined" class="reset-button" @click="findpassword()">비밀번호 찾기</v-btn>
          <v-btn rounded="0" class="find-id-button" @click="login()">로그인</v-btn>
        </div>
      </form>
    </v-main>
  </v-layout>
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

.find-id-form {
  max-width: 600px;
  width: 100%;
  padding: 4rem;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.38);
}

.login-form {
  max-width: 600px;
  width: 100%;
  padding: 4rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.37);
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

.font-label {
  font-size: 16px;
  font-weight: 700;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.reset-button {
  height: 56px;
  font-size: 1rem;
  font-weight: 500;
}

.find-id-button {
  height: 56px;
  font-size: 1rem;
  font-weight: 500;
  background-color: black;
  color: white;
}
</style>
