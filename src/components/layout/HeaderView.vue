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
      <v-app-bar-title>로고</v-app-bar-title>
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
.wrapper {
    display: grid;
    grid-template-columns: 1fr 100px 1fr;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}
.center {
    text-align: center;
}

.login {
    display: flex;
    justify-content: end;
    gap: 1rem;
}
</style>
