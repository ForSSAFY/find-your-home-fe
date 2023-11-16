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

//비밀 번호가 일치 하지 않을 경우
// const passwordNotMatch = computed(() => {
//   return v$.password.value  !== v$.passwordchk.value;
// })
</script>

<template>
  <v-main>
    <div class="container">
      <h1 class="pt-5 pb-5">회원가입</h1>
      <form class="joinForm">
        <v-text-field
          v-model="state.nickname"
          :counter="8"
          variant="outlined"
          placeholder="닉네임"
          required
          @input="v$.nickname.$touch"
          @blur="v$.nickname.$touch"
        ></v-text-field>
        <div class="errors" v-if="v$.nickname.$error">닉네임을 입력하세요.</div>

        <v-text-field
          v-model="state.id"
          placeholder="아이디"
          variant="outlined"
          required
          @input="v$.id.$touch"
          @blur="v$.id.$touch"
        ></v-text-field>
        <div class="errors" v-if="v$.id.$error">아이디를 입력하세요.</div>

        <v-text-field
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
        <div class="errors" v-if="v$.password.$error">비밀번호를 입력하세요.</div>

        <v-text-field
          v-model="state.passwordchk"
          placeholder="비밀번호 확인"
          variant="outlined"
          required
          @input="v$.passwordchk.$touch"
          @blur="v$.passwordchk.$touch"
        ></v-text-field>
        <!-- <div v-if="passwordNotMatch">비밀번호가 일치하지 않습니다.</div> -->

        <v-checkbox
          v-model="state.checkbox"
          label="개인정보 이용에 동의하십니까?"
          required
          @change="v$.checkbox.$touch"
          @blur="v$.checkbox.$touch"
        ></v-checkbox>

        <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
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
  text-align: center;
  margin: 0 auto;
  max-width: 350px;
}
</style>
