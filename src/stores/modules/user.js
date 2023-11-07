import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const joinedPlate = ref(false)

    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const isLogin = ref(false)

    const setLogin = (e) => {
      isLogin.value = e
    }

    const removeLogin = () => {
      isLogin.value = false
    }

    const setJoinPlate = (e) => {
      joinedPlate.value = e
    }

    const removeJoinPlate = () => {
      joinedPlate.value = false
    }

    return {
      token,
      setToken,
      removeToken,
      isLogin,
      setLogin,
      removeLogin,
      joinedPlate,
      removeJoinPlate,
      setJoinPlate
    }
  },
  {
    persist: true
  }
)
