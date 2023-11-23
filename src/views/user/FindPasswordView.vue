<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { toValue } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

interface State {
  username: string
  email: string
}

const initialState: State = {
  username: '',
  email: ''
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  username: { required: helpers.withMessage('아이디를 입력해주세요', required) },
  email: {
    required: helpers.withMessage('이메일을 입력해주세요', required),
    email: helpers.withMessage('이메일 형식이 올바르지 않습니다', email)
  }
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key as keyof typeof initialState] = value
  }
}

const check = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  router.push({ name: 'find-pw-complete' })
}
</script>

<template>
  <v-layout>
    <v-main class="container">
      <form class="find-id-form">
        <header class="header mb-6">
          <h2>비밀번호 재설정</h2>
          <div class="header-line"></div>
        </header>

        <label class="font-label">아이디</label>
        <v-text-field :error-messages="v$.username.$errors.map((e) => '아이디를 입력하세요')" v-model="state.username" rounded="0"
          placeholder="아이디를 입력하세요." variant="outlined" required></v-text-field>

        <label class="font-label">이메일</label>
        <v-text-field :error-messages="v$.email.$errors.map((e) => toValue(e.$message))" v-model="state.email" rounded="0"
          placeholder="이메일을 입력하세요." variant="outlined" required></v-text-field>
        <div class="buttons">
          <v-btn rounded="0" variant="outlined" class="reset-button" @click="clear()">초기화</v-btn>
          <v-btn rounded="0" class="find-id-button" @click="check()">다음</v-btn>
        </div>
      </form>
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

.find-id-form {
  max-width: 600px;
  width: 100%;
  padding: 4rem;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.38);
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

.font-label {
  font-weight: 500;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.reset-button {
  height: 56px;
  font-size: 1rem;
  font-weight: 500;
}

.find-id-button {
  height: 56px;
  font-size: 1rem;
  font-weight: 500;
  background-color: black;
  color: white;
}
</style>
