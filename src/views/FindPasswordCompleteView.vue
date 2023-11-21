<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'

//라우터 받기
const router = useRouter()

//props 역할
interface State {
  password: string
  passwordchk: string
}

const initialState: State = {
  password: '',
  passwordchk: ''
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  password: { required, minLength: minLength(8), maxLength: maxLength(20) },
  passwordchk: { required, sameAsPassword: sameAs(() => state.password, "비밀번호가 일치하지 않습니다.") },
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()
  
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}
console.log(state.password, state.passwordchk);

const login = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  router.push({ name: 'login' })
}
</script>

<template>
  <v-main class="container">
    <form class="find-id-form">
      <header class="header">
        <h2>비밀번호 찾기</h2>
        <div class="header-line"></div>
      </header>
      <div class="font-label">새로운 비밀번호를 입력해 주세요.</div>
      <v-text-field
        :error-messages="v$.password.$errors.map((e) => '비밀번호를 입력하세요.')"
        v-model="state.password"
        rounded="0"
        variant="outlined"
        placeholder="영문자 및 숫자 기호를 포함한 8자리 이상 20자리 이하"
      ></v-text-field>
      <v-text-field
        :error-messages="v$.passwordchk.$errors.map((e) => e.$message)"
        v-model="state.passwordchk"
        rounded="0"
        variant="outlined"
        placeholder="비밀번호를 한번 더 입력하세요."
      ></v-text-field>
      <div class="buttons">
        <v-btn rounded="0" variant="outlined" class="reset-button" @click="clear()">초기화</v-btn>
        <v-btn rounded="0" class="find-id-button" @click="login()">로그인</v-btn>
      </div>
    </form>
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

.find-id-form {
  max-width: 600px;
  width: 100%;
  padding: 4rem;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.38);
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
  flex: 1 0 0;
  border-bottom: 2px solid black;
}

.font-label {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.id-part {
  padding: 1rem 0;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.reset-button {
  height: 56px;
}

.find-id-button {
  height: 56px;
  background-color: black;
  color: white;
}
</style>
