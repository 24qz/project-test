import { ref } from 'vue'
import { defineStore } from 'pinia'
type User =
  | undefined
  | {
      token: string
      id: string
      account: string
      mobile: string
      avatar: string
    }

export const useStore = defineStore(
  'counter',
  () => {
    const Info = ref<User>({
      token: '121212',
      id: '2222',
      account: '好嘞',
      mobile: '212121',
      avatar: 'https'
    })
    const num = ref<number>(0)

    const setUser = (u: User) => {
      Info.value = u
    }

    const delUser = () => {
      Info.value = undefined
    }

    const add = () => {
      num.value++
    }

    return { Info, setUser, delUser, num, add }
  },
  {
    persist: true
  }
)
