<script setup lang="ts">
</script>

<template>
  <v-app-bar :elevation="4" :height="72">
    <div class="wrapper">
      <v-app-bar-title>
        <router-link :to="{ name: 'main' }" class="logo">
          FIND YOUR HOME
        </router-link>
      </v-app-bar-title>

      <nav class="menu">
        <v-btn rounded="0" :to="{ name: 'map' }" class="menu-item">
          아파트
        </v-btn>
        <v-btn rounded="0" class="menu-item">
          관심 지역
          <v-tooltip activator="parent" location="bottom">추후 개발 예정</v-tooltip>
        </v-btn>
        <v-btn rounded="0" :to="{ name: 'news' }" class="menu-item">
          뉴스
        </v-btn>
      </nav>

      <div class="login-wrapper">
        <v-btn variant="elevated" rounded="0" :to="{ name: 'login' }" class="login">로그인</v-btn>
        <v-btn variant="outlined" rounded="0" :to="{ name: 'join' }" class="join">회원가입</v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: min-content auto auto;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  margin: 0 auto;
}

.logo {
  width: 15rem;
  font-weight: 900;
  font-size: 24px;
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
  padding: 1rem 0.5rem;
}

.menu-item {
  font-size: 1rem;
  font-weight: 600;
}

.login-wrapper {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}

.login {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  height: auto;
  color: white;
  background-color: black;
}

.join {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  height: auto;
}
</style>
