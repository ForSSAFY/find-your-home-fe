<script setup lang="ts">
import { doLogin } from '@/api/login';
import { useLoginStore } from '@/stores/loginStore';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const visible = ref(false)

//props 역할
interface State {
  username: string
  password: string
}

const initialState: State = {
  username: '',
  password: '',
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  username: { required },
  password: { required },
}

const v$ = useVuelidate(rules, state)

const store = useLoginStore()

const login = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  doLogin(state)
    .then((res) => {
      store.username = res.data.username
      store.nickname = res.data.nickname
    })
    .then(() => router.push({ name: 'main' }))
    .catch((err) => alert('로그인 실패!' + err))
}
</script>

<template>
  <v-layout>
    <v-main class="container">
      <v-card class="login-form" rounded="0">
        <div class="header mb-6">
          <h2>로그인</h2>
          <div class="header-line"></div>
        </div>

        <v-text-field :error-messages="v$.username.$errors.map((e) => '아이디를 입력하세요.')" v-model="state.username" rounded="0"
          density="comfortable" placeholder="아이디" prepend-inner-icon="person" variant="outlined"></v-text-field>

        <v-text-field :append-inner-icon="visible ? 'visibility_off' : 'visibility'" :type="visible ? 'text' : 'password'"
          :error-messages="v$.password.$errors.map((e) => '비밀번호를 입력하세요')" v-model="state.password" rounded="0"
          density="comfortable" placeholder="비밀번호" prepend-inner-icon="lock" variant="outlined"
          @click:append-inner="visible = !visible"></v-text-field>

        <v-btn class="login-button" rounded="0" @click="login()">로그인</v-btn>

        <nav class="find_wrap">
          <router-link to="/find-id">아이디 찾기</router-link>
          <v-divider vertical />
          <router-link to="/find-pw">비밀번호 찾기</router-link>
          <v-divider vertical />
          <router-link to="/join">회원가입</router-link>
        </nav>
      </v-card>
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

/* 로그인 버튼 */
.login-button {
  width: 100%;
  height: 56px;
  font-weight: 500;
  font-size: 1rem;
  background-color: black;
  color: white;
}

.find_wrap {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.find_wrap>a {
  color: black;
  text-decoration: none;
}

.find_wrap>a:hover {
  text-decoration: underline;
  text-underline-offset: 0.25rem;
}
</style>
