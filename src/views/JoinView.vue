<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

//props 역할
interface State {
  nickname: string
  email: string
  password: string
  passwordchk: string
  checkbox: boolean | null
}

const initialState: State = {
  nickname: '',
  email: '',
  password: '',
  passwordchk: '',
  checkbox: null
}

const state = reactive<State>({
  ...initialState
})

const rules = {
  nickname: { required },
  email: { required },
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
          v-model="state.nickname"
          :error-messages="v$.nickname.$errors.map((e) => e.$message)"
          :counter="8"
          variant="outlined"
          placeholder="닉네임"
          required
          @input="v$.nickname.$touch"
          @blur="v$.nickname.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.email"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          placeholder="id"
          variant="outlined"
          required
          @input="v$.email.$touch"
          @blur="v$.email.$touch"
        ></v-text-field>

        <v-text-field
          :append-inner-icon="visible ? 'visibility_off' : 'visibility'"
          :type="visible ? 'text' : 'password'"
          v-model="state.password"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          placeholder="password"
          variant="outlined"
          required
          @input="v$.password.$touch"
          @blur="v$.password.$touch"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
          v-model="state.passwordchk"
          :error-messages="v$.passwordchk.$errors.map((e) => e.$message)"
          placeholder="password 확인"
          variant="outlined"
          required
          @input="v$.passwordchk.$touch"
          @blur="v$.passwordchk.$touch"
        ></v-text-field>

        <v-checkbox
          v-model="state.checkbox"
          :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
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
