import { ref } from 'vue'
import { defineStore } from 'pinia'
export type User =
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
    const Info = ref<User>()
    const bb = '回来'

    const setUser = (u: User) => {
      Info.value = u
    }

    const delUser = () => {
      Info.value = undefined
    }

    return { Info, setUser, delUser, bb }
  },
  {
    persist: true
  }
)
