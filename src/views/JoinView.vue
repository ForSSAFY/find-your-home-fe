<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
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
  <v-main>
    <div class="container">
      <form class="join-form">
        <div class="join-form-inner">
          <div class="header">
            <h2>회원가입</h2>
            <div class="header-line"></div>
          </div>

          <div class="font-label">아이디</div>
          <div class="join-form-button">
            <v-text-field
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

          <div class="font-label">닉네임</div>
          <div class="join-form-button">
            <v-text-field
              :counter="8"
              :error-messages="v$.nickname.$errors.map((e) => '닉네임을 입력하세요.')"
              v-model="state.nickname"
              variant="outlined"
              placeholder="닉네임"
              required
              @input="v$.nickname.$touch"
              @blur="v$.nickname.$touch"
            ></v-text-field>
            <v-btn class="none-button" disabled>중복확인</v-btn>
          </div>

          <div class="font-label">비밀번호</div>
          <div class="join-form-button">
            <v-text-field
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
            <v-btn class="none-button" disabled>중복확인</v-btn>
          </div>

          <div class="join-form-button">
            <v-text-field
              v-model="state.passwordchk"
              placeholder="비밀번호 확인"
              variant="outlined"
              required
              :error-messages="v$.passwordchk.$errors.map((e) => '비밀번호 확인을입력하세요.')"
              @input="v$.passwordchk.$touch"
              @blur="v$.passwordchk.$touch"
            ></v-text-field>
            <v-btn class="none-button" disabled> 중복확인 </v-btn>
          </div>
          <div class="buttons">
            <v-btn rounded="0" variant="outlined" class="reset-button" @click="clear">초기화</v-btn>
            <router-link to="/"
              ><v-btn rounded="0" class="join-button" @click="v$.$validate"
                >가입하기</v-btn
              ></router-link
            >
          </div>
        </div>
      </form>
    </div>
  </v-main>
</template>
<style scoped>
.container {
  width: 100vw;
}

.join-form {
  width: 800px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.38);
}

.join-form-inner {
  width: 650px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.join-form-button {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.duplicate-check-button {
  width: 110px;
  height: 56px;
  background-color: black;
  color: white;
}

.none-button {
  width: 110px;
  visibility: hidden;
}

.font-label{
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
  margin-bottom: 16px;
}

.header h2 {
  text-align: left;
  font-weight: 700;
  font-size: 40px;
}

.header-line {
  flex: 1 0 0;
  border-bottom: 2px solid black;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.reset-button {
  width: 222px;
  height: 56px;
}
.join-button {
  width: 222px;
  height: 56px;
  background-color: black;
  color: white;
}
</style>
