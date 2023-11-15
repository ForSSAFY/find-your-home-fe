<script setup lang="ts"></script>

<template>
  <header>
    <v-app-bar :elevation="3">
      <div class="wrapper">
        <div>
          <v-btn>Find Your Home</v-btn>
          <v-btn>관심 지역</v-btn>
          <router-link :to="{name:'qna'}"><v-btn>Q&A</v-btn></router-link>
        </div>
        <div class="center">
          <v-app-bar-title class="center-logo">
              <router-link :to="{name:'main'}">
                <v-img src="/src/assets/logo.PNG"></v-img>
              </router-link>
            </v-app-bar-title>
        </div>
        <div class="login">
          <router-link :to="{name:'login'}"><v-btn>로그인</v-btn></router-link>
          <router-link :to="{name:'join'}"><v-btn>회원가입</v-btn></router-link>
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
  padding: 1vh;
  margin: 0 auto;
}
.center {
  display: flex;
  justify-content: center;
}
.center-logo{
  text-align: center;
  max-width: 200px;
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
