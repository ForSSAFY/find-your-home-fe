import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const username = ref('')
  const nickname = ref('')

  return { username, nickname }
})
