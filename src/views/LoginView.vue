<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <v-main>
    <div class="container">
      <h1 class="pt-5 pb-5">로그인</h1>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">ID</div>

        <v-text-field
          density="compact"
          placeholder="아이디"
          prepend-inner-icon="person"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
          <a
            class="text-caption text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            비밀번호를 잊으셨나요?</a
          >
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'visibility_off' : 'visibility'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="비밀번호"
          prepend-inner-icon="lock"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn block class="mb-1" size="large" variant="tonal">로그인</v-btn>

        <v-card-text class="text-center">
          <router-link to="/join" class="text-decoration-none">회원가입</router-link>
        </v-card-text>
      </v-card>
    </div>
  </v-main>
</template>

<style scoped>
.container{
    width: 100vw;
}

.container h1{
    text-align: center;
}
</style>
