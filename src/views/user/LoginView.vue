<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { doLogin } from '@/api/login';

const router = useRouter()
const visible = ref(false)

//props 역할
interface State {
  id: string
  password: string
}

const initialState: State = {
  id: '',
  password: '',
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  id: { required },
  password: { required },
}

const v$ = useVuelidate(rules, state)

const login = async() => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  doLogin(state)
    .then(() => router.push({ name: 'main' }))
  .catch((err)=> alert('로그인 실패!' + err))
}
</script>

<template>
  <v-main class="container">
    <v-card class="login-form" rounded="0">
      <div class="header">
        <h2>로그인</h2>
        <div class="header-line"></div>
      </div>

      <v-text-field
        :error-messages="v$.id.$errors.map((e) => '아이디를 입력하세요.')"
        v-model="state.id"
        rounded="0"
        density="comfortable"
        placeholder="아이디"
        prepend-inner-icon="person"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible ? 'visibility_off' : 'visibility'"
        :type="visible ? 'text' : 'password'"
        :error-messages="v$.password.$errors.map((e) => '비밀번호를 입력하세요')"
        v-model="state.password"
        rounded="0"
        density="comfortable"
        placeholder="비밀번호"
        prepend-inner-icon="lock"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn class="login-button" rounded="0" @click="login()">로그인</v-btn>

      <div class="find_wrap">
        <router-link to="/find-id" class="text-decoration-none">아이디 찾기</router-link>
        <v-divider inset vertical></v-divider>
        <router-link to="/find-pw" class="text-decoration-none">비밀번호 찾기</router-link>
        <v-divider inset vertical></v-divider>
        <router-link to="/join" class="text-decoration-none">회원 가입</router-link>
      </div>
    </v-card>
  </v-main>
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
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 2rem;
}

.header h2 {
  font-weight: 700;
  font-size: 40px;
  line-height: 1;
}

.header-line {
  /* (grow, shrink, basis) */
  flex: 1 0 0;
  border-bottom: 2px solid black;
}

.v-divider {
  height: 16px;
  background-color: black;
}

/* 로그인 버튼 */
.login-button {
  width: 100%;
  height: 56px;
  background-color: black;
  color: white;
}

.find_wrap {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 10px;
  margin-top: 1rem;
}
</style>
