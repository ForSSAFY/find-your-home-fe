<script setup lang="ts"></script>

<template>
  <header>
    <v-app-bar :elevation="3">
      <div class="wrapper">
        <v-app-bar-title class="logo">
          <router-link :to="{ name: 'main' }">
            <v-img src="/src/assets/logo.PNG"></v-img>
          </router-link>
        </v-app-bar-title>
        <div class="menu">
          <v-btn>Find Your Home</v-btn>
          <v-btn>관심 지역</v-btn>
          <v-btn>뉴스</v-btn>
        </div>
        <div class="login">
          <router-link :to="{ name: 'login' }"><v-btn rounded="0">로그인</v-btn></router-link>
          <router-link :to="{ name: 'join' }"><v-btn rounded="0">회원가입</v-btn></router-link>
        </div>
      </div>
    </v-app-bar>
  </header>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  max-width: 1300px;
  width: 100%;
  align-items: center;
  padding: 1vh;
  margin: 0 auto;
}
.logo {
  text-align: center;
  max-width: 200px;
}

.login {
  display: flex;
  justify-content: end;
  gap: 1rem;
}

.login button {
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 700;
}
</style>
