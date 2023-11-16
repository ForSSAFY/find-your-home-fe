<script setup lang="ts">
import {login} from "@/api/login"
import { ref } from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

interface doLoginReq{
  id: string,
  password : string
}

const loginReq = ref<doLoginReq>({
  id: '',
  password : ''
})

function post() {
  if (loginReq.value.id.trim().length < 1) {
    alert("아이디를 입력해주세요")
    return;
  }
  if (loginReq.value.password.trim().length < 1) {
    alert("비밀번호를 입력해주세요")
    return
  }

  login(loginReq.value)
    .then(() => router.replace({name:"main"}))
    .catch((err)=>alert("로그인 실패! : 다시 로그인 해주세요" + err))
}

const visible = ref(false)

</script>

<template>
  <v-main>
    <div class="container">
      <h1 class="pt-5 pb-5">로그인</h1>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">ID</div>

        <v-text-field
          v-model="loginReq.id"
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
          v-model="loginReq.password"
          density="compact"
          placeholder="비밀번호"
          prepend-inner-icon="lock"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn block class="mb-1" size="large" variant="tonal" @click="post">로그인</v-btn>

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
