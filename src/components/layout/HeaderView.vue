<script setup lang="ts"></script>

<template>
  <header>
    <v-app-bar :elevation="3">
      <div class="wrapper">
        <div>
          <v-btn>Find Your Home</v-btn>
          <v-btn>관심 지역</v-btn>
          <v-btn>Q&A</v-btn>
        </div>
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
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 1300px;
  width: 100%;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;
}
.center {
  display: flex;
  justify-content: center;
}
.center-logo{
  text-align: center;
  max-width: 250px;
}

.login {
  display: flex;
  justify-content: end;
  gap: 1rem;
}

.login button{
  outline: 1px solid black;
}
</style>
