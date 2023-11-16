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
  checkbox: boolean | null
}

const initialState: State = {
  nickname: '',
  id: '',
  password: '',
  passwordchk: '',
  checkbox: null
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  nickname: { required },
  id: { required },
  password: { required },
  passwordchk: { required },
  checkbox: { required }
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
      <h1 class="pt-5 pb-5">회원가입</h1>
      <form class="joinForm">
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

        <v-text-field
          :error-messages="v$.id.$errors.map((e) => '아이디를 입력하세요.')"
          v-model="state.id"
          placeholder="아이디"
          variant="outlined"
          required
          @input="v$.id.$touch"
          @blur="v$.id.$touch"
        ></v-text-field>

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

        <v-text-field
          v-model="state.passwordchk"
          placeholder="비밀번호 확인"
          variant="outlined"
          required
          :error-messages="v$.passwordchk.$errors.map((e) => '비밀번호 확인을입력하세요.')"
          @input="v$.passwordchk.$touch"
          @blur="v$.passwordchk.$touch"
        ></v-text-field>

        <v-checkbox
          v-model="state.checkbox"
          label="개인정보 이용에 동의하십니까?"
          required
          @change="v$.checkbox.$touch"
          @blur="v$.checkbox.$touch"
        ></v-checkbox>

        <v-btn class="me-4" @click="v$.$validate">가입하기</v-btn>
        <v-btn @click="clear">초기화</v-btn>
      </form>
    </div>
  </v-main>
</template>
<style scoped>
.container {
  width: 100vw;
}

.container h1 {
  text-align: center;
}

.joinForm {
  margin: 0 auto;
  max-width: 350px;
  gap: 1vh;
}
</style>
