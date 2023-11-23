import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const username = ref(sessionStorage.username ?? '')
  const nickname = ref(sessionStorage.nickname ?? '')

  watch(username, (username) => {
    sessionStorage.username = username
  })

  watch(nickname, (nickname) => {
    sessionStorage.nickname = nickname
  })

  return { username, nickname }
})
