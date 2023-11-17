<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <v-main>
    <div class="container">
      <v-card class="login-form" elevation="8" rounded="0">
        <div class = "login-form-inner">
          <div class="header mb-3">
            <h2>로그인</h2>
            <div class="header-line">
            </div>
          </div>
  
          <v-text-field
            density="comfortable"
            placeholder="아이디"
            prepend-inner-icon="person"
            variant="outlined"
          ></v-text-field>
  
          <v-text-field
            :append-inner-icon="visible ? 'visibility_off' : 'visibility'"
            :type="visible ? 'text' : 'password'"
            density="comfortable"
            placeholder="비밀번호"
            prepend-inner-icon="lock"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
  
          <v-btn class="login-button" rounded="0">로그인</v-btn>
  
          <v-card-text class="find_wrap">
            <router-link to="/join" class="text-decoration-none">아이디 찾기</router-link>
            <v-divider inset vertical></v-divider>
            <router-link to="/join" class="text-decoration-none">비밀번호 찾기</router-link>
            <v-divider inset vertical></v-divider>
            <router-link to="/join" class="text-decoration-none">회원 가입</router-link>
          </v-card-text>
        </div>
      </v-card>
    </div>
  </v-main>
</template>

<style scoped>
.container {
  width: 100vw;
}
.login-form{
  width: 800px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.37);
}

.login-form-inner{
  width: 580px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.header h2{
  text-align: left;
  font-weight: 700;
  font-size: 40px;
}

.header-line{
  /* (grow, shrink, basis) */
  flex: 1 0 0; 
  border-bottom: 2px solid black;
}

.v-divider{
  height: 16px;
  background-color: black;
}

/* 로그인 버튼 */
.login-button {
  width: 580px;
  height: 56px;
  background-color: black;
  color: white;
}

.find_wrap {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 10px;
}
</style>
