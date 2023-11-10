<script setup lang="ts"></script>

<template>
  <header>
    <v-app-bar :elevation="3">
      <div class="wrapper">
        <nav>
          <v-btn>Find Your House</v-btn>
          <v-btn>관심 지역</v-btn>
          <v-btn>Q&A</v-btn>
        </nav>
        <div class="center">
          <v-app-bar-title class="center-logo">
            <v-img src="/src/assets/logo.PNG"></v-img>
          </v-app-bar-title>
        </div>
        <div class="login">
          <v-btn>로그인</v-btn>
          <v-btn>회원가입</v-btn>
        </div>
      </div>
    </v-app-bar>
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.center {
  display: flex;
  justify-content: center;
  max-width: 180px;
}
.center-logo{
  text-align: center;
}
.login {
  display: flex;
  justify-content: end;
  gap: 1rem;
}
</style>
