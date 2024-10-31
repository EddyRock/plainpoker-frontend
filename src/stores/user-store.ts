import { defineStore } from 'pinia'
import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from 'src/constants/localStorage.constants'
import { type IUser } from 'src/core/API/UserService'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    refreshToken: '',
    user: {} as IUser,
  }),
  getters: {
    isAuthorized: (state) => Boolean(state.token),
    getUser: (state) => state.user,
  },
  actions: {
    onSaveToken(token: string, refreshToken: string): void {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)

      this.token = token
      this.refreshToken = refreshToken
    },
    onSaveUser(user: IUser): void {
      this.user = user
    },
    onClearToken(): void {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)

      this.token = ''
      this.refreshToken = ''
    },
    onClearUser(): void {
      this.user = {}
    },
  },
})
