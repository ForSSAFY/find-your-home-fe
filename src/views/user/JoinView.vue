<script lang="ts" setup>
import { register } from '@/api/join'
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators'
import { computed, reactive, ref, toValue } from 'vue'
import { useRouter } from 'vue-router'

//라우터
const router = useRouter()

//props 역할
interface State {
  username: string
  nickname: string
  email: string
  password: string
  passwordchk: string
}

const initialState: State = {
  username: '',
  nickname: '',
  email: '',
  password: '',
  passwordchk: ''
}

const state = reactive<State>({
  ...initialState
})

const regexId = helpers.regex(/^[a-z]+[a-z0-9]{5,11}$/g)
const regexPass = helpers.regex(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/)

const rules = {
  username: {
    required: helpers.withMessage('아이디를 입력해주세요', required),
    minLength: helpers.withMessage('아이디 최소 길이는 6글자입니다.', minLength(6)),
    maxLength: helpers.withMessage('아이디 최대 길이는 12글자입니다.', maxLength(12)),
    regexId: helpers.withMessage('아이디는 6~12자의 영소문자 및 숫자만 가능합니다.', regexId)
  },
  nickname: {
    required: helpers.withMessage('닉네임을 입력해주세요', required),
    minLength: helpers.withMessage('닉네임 최소 길이는 2글자입니다.', minLength(2)),
    maxLength: helpers.withMessage('닉네임 최소 길이는 12글자입니다.', maxLength(12))
  },
  email: {
    required: helpers.withMessage('이메일을 입력해주세요', required),
    email: helpers.withMessage('이메일 형식이 올바르지 않습니다', email)
  },
  password: {
    required: helpers.withMessage('패스워드를 입력해주세요', required),
    minLength: helpers.withMessage('비밀번호 최소 길이는 8글자입니다.', minLength(8)),
    maxLength: helpers.withMessage('비밀번호 최대 길이는 20글자입니다.', maxLength(20)),
    regexPass: helpers.withMessage(
      '비밀번호는 8~20자의 영대소문자, 숫자 하나씩 포함해야합니다.',
      regexPass
    )
  },
  passwordchk: {
    required: helpers.withMessage('패스워드 확인을 입력해주세요', required),
    sameAsPassword: helpers.withMessage(
      '비밀번호가 일치하지 않습니다',
      sameAs(computed(() => state.password))
    )
  }
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key as keyof typeof initialState] = value
  }
}

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  register(state)
    .then(() => router.push({ name: 'login' }))
    .catch((err) => alert('회원가입 실패' + err))
  router.push({ name: 'login' })
}

function alertOk() {
  alert('사용 가능한 아이디입니다')
}

const visible = ref(false)
</script>

<template>
  <v-layout>
    <v-main class="container">
      <form class="join-form">
        <header class="header mb-6">
          <h2>회원가입</h2>
          <div class="header-line"></div>
        </header>

        <label class="font-label">아이디</label>
        <div class="join-form-row">
          <v-text-field :error-messages="v$.username.$errors.map((e) => toValue(e.$message))" v-model="state.username"
            placeholder="아이디" hint="아이디는 6 ~ 12자의 영문,숫자만 사용가능합니다." variant="outlined" rounded="0" required
            @input="v$.username.$touch" @blur="v$.username.$touch" />
          <v-btn rounded="0" class="duplicate-check-button" @click="alertOk()">중복확인</v-btn>
        </div>

        <label class="font-label">이메일</label>
        <div class="join-form-row">
          <v-text-field :error-messages="v$.email.$errors.map((e) => toValue(e.$message))" v-model="state.email"
            placeholder="이메일" variant="outlined" rounded="0" required @input="v$.email.$touch" @blur="v$.email.$touch" />
          <v-btn rounded="0" class="duplicate-check-button">이메일 인증</v-btn>
        </div>

        <label class="font-label">닉네임</label>
        <div class="join-form-row">
          <v-text-field :error-messages="v$.nickname.$errors.map((e) => toValue(e.$message))" v-model="state.nickname"
            placeholder="닉네임" rounded="0" variant="outlined" required @input="v$.nickname.$touch"
            @blur="v$.nickname.$touch" />
          <div></div>
        </div>

        <label class="font-label">비밀번호</label>
        <div class="join-form-row">
          <v-text-field :error-messages="v$.password.$errors.map((e) => toValue(e.$message))"
            :append-inner-icon="visible ? 'visibility_off' : 'visibility'" :type="visible ? 'text' : 'password'"
            v-model="state.password" placeholder="영문자 및 숫자 기호를 포함한 8자리 이상 20자리 이하" rounded="0" variant="outlined"
            hint="영문자 및 숫자 기호를 포함한 8자리 이상 20자리 이하" required @input="v$.password.$touch" @blur="v$.password.$touch"
            @click:append-inner="visible = !visible" />
          <div></div>
        </div>

        <div class="join-form-row">
          <v-text-field v-model="state.passwordchk" placeholder="비밀번호 확인" rounded="0" variant="outlined" type="password"
            required :error-messages="v$.passwordchk.$errors.map((e) => toValue(e.$message))"
            @input="v$.passwordchk.$touch" @blur="v$.passwordchk.$touch" />
          <div></div>
        </div>
        <div class="buttons">
          <v-btn rounded="0" variant="outlined" class="reset-button" @click="clear()">초기화</v-btn>
          <v-btn rounded="0" class="join-button" @click="submit()">가입하기</v-btn>
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

.join-form {
  max-width: 800px;
  width: 100%;
  padding: 4rem;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.38);
}

.join-form-row {
  display: grid;
  grid-template-columns: 1fr 8rem;
  gap: 1rem;
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
  font-weight: 500;
}

/* 회원가입 헤더 */

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

.join-button {
  height: 56px;
  font-size: 1rem;
  font-weight: 500;
  background-color: black;
  color: white;
}
</style>
