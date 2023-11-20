<script lang="ts" setup>
import { reactive, ref} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

//props 역할
interface State {
  nickname: string
  id: string
  password: string
  passwordchk: string
}

const initialState: State = {
  nickname: '',
  id: '',
  password: '',
  passwordchk: ''
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  nickname: { required },
  id: { required },
  password: { required },
  passwordchk: { required }
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

const visible = ref(false)
</script>

<template>
  <v-main class="container">
    <form class="join-form">
      <header class="header">
        <h2>회원가입</h2>
        <div class="header-line"></div>
      </header>

      <label class="font-label">아이디</label>
      <div class="join-form-row">
        <v-text-field
          rounded="0"
          :error-messages="v$.id.$errors.map((e) => '아이디를 입력하세요.')"
          v-model="state.id"
          placeholder="아이디"
          variant="outlined"
          required
          @input="v$.id.$touch"
          @blur="v$.id.$touch"
        ></v-text-field>
        <v-btn rounded="0" class="duplicate-check-button">중복확인</v-btn>
      </div>

      <label class="font-label">이메일</label>
      <div class="join-form-row">
        <v-text-field
          rounded="0"
          :counter="8"
          :error-messages="v$.nickname.$errors.map((e) => '이메일을 입력하세요.')"
          v-model="state.nickname"
          variant="outlined"
          placeholder="이메일"
          required
          @input="v$.nickname.$touch"
          @blur="v$.nickname.$touch"
        ></v-text-field>
        <v-btn rounded="0" class="duplicate-check-button">이메일 인증</v-btn>
      </div>

      <label class="font-label">닉네임</label>
      <div class="join-form-row">
        <v-text-field
          rounded="0"
          :counter="8"
          :error-messages="v$.nickname.$errors.map((e) => '닉네임을 입력하세요.')"
          v-model="state.nickname"
          variant="outlined"
          placeholder="닉네임"
          required
          @input="v$.nickname.$touch"
          @blur="v$.nickname.$touch"
        ></v-text-field>
        <v-btn rounded="0" class="duplicate-check-button none-button" disabled>중복확인</v-btn>
      </div>

      <label class="font-label">비밀번호</label>
      <div class="join-form-row">
        <v-text-field
          rounded="0"
          :error-messages="v$.password.$errors.map((e) => '비밀번호를 입력하세요.')"
          :append-inner-icon="visible ? 'visibility_off' : 'visibility'"
          :type="visible ? 'text' : 'password'"
          v-model="state.password"
          placeholder="비밀번호"
          variant="outlined"
          required
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-btn rounded="0" class="duplicate-check-button none-button" disabled>중복확인</v-btn>
      </div>

      <div class="join-form-row">
        <v-text-field
          rounded="0"
          v-model="state.passwordchk"
          placeholder="비밀번호 확인"
          variant="outlined"
          required
          :error-messages="v$.passwordchk.$errors.map((e) => '비밀번호를 한번 더 입력하세요.')"
          @input="v$.passwordchk.$touch"
          @blur="v$.passwordchk.$touch"
        ></v-text-field>
        <v-btn rounded="0" class="duplicate-check-button none-button" disabled>중복확인</v-btn>
      </div>
      <div class="buttons">
        <v-btn rounded="0" variant="outlined" class="reset-button" @click="clear">초기화</v-btn>
        <v-btn rounded="0" class="join-button" @click="v$.$validate">가입하기</v-btn>
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

.join-form {
  max-width: 800px;
  width: 100%;
  padding: 4rem;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.38);
}

.join-form-row {
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 16px;
}

.duplicate-check-button {
  padding-left: 2rem;
  padding-right: 2rem;
  height: 56px;
  background-color: black;
  color: white;
}

.none-button {
  visibility: hidden;
}

.font-label {
  font-size: 16px;
  font-weight: 700;
}

/* 회원가입 헤더 */
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

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.reset-button {
  height: 56px;
}
.join-button {
  height: 56px;
  background-color: black;
  color: white;
}
</style>
