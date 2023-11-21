<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const router = useRouter()

interface State {
  id: string
  email: string
}

const initialState: State = {
  id: '',
  email: ''
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  id: { required: helpers.withMessage('아이디를 입력해주세요', required) },
  email: {
    required: helpers.withMessage('이메일을 입력해주세요', required),
    email: helpers.withMessage('이메일 형식이 올바르지 않습니다', email)
  }
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const check = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  router.push({ name: 'find-pw-complete' })
}
</script>

<template>
  <v-main class="container">
    <form class="find-id-form">
      <header class="header">
        <h2>비밀번호 찾기</h2>
        <div class="header-line"></div>
      </header>
      <label class="font-label">아이디</label>
      <v-text-field
        :error-messages="v$.id.$errors.map((e) => '아이디를 입력하세요')"
        v-model="state.id"
        rounded="0"
        placeholder="아이디를 입력하세요."
        variant="outlined"
        required
      ></v-text-field>

      <label class="font-label">이메일</label>
      <v-text-field
        :error-messages="v$.email.$errors.map((e) => '이메일을 입력하세요')"
        v-model="state.email"
        rounded="0"
        placeholder="이메일을 입력하세요."
        variant="outlined"
        required
      ></v-text-field>
      <div class="buttons">
        <v-btn rounded="0" variant="outlined" class="reset-button" @click="clear()">초기화</v-btn>
        <v-btn rounded="0" class="find-id-button" @click="check()">다음</v-btn>
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