<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import Api from 'src/core/API'

  import { useUserStore } from 'src/stores/user-store'
  import { useRouter } from 'vue-router'

  import {
    TOKEN_KEY,
    REFRESH_TOKEN_KEY,
  } from 'src/constants/localStorage.constants'

  import { type IUser } from 'src/core/API/UserService'

  interface ISaveInformationParams {
    user: IUser
    access: string
    refresh: string
  }

  export default defineComponent({
    name: 'App',
    setup() {
      const userStore = useUserStore()
      const router = useRouter()

      const token = localStorage.getItem(TOKEN_KEY) as string
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) as string

      const onSaveUserInformation = (params: ISaveInformationParams): void => {
        const { access, refresh, user } = params ?? {}

        userStore.onSaveToken(access, refresh)
        userStore.onSaveUser(user)
      }

      const onRefreshTokens = async (): Promise<void> => {
        try {
          const { access, refresh } = await Api.authService.tokenRefresh(
            refreshToken as string
          )
          userStore.onSaveToken(access, refresh)
          const user = await Api.userService.getUser()
          userStore.onSaveUser(user)
        } catch (error) {
          console.error(error)
          userStore.onClearToken()
          userStore.onClearUser()
          router.push('/login')
        }
      }
      const onLoginPreSavedUser = async (): Promise<void> => {
        try {
          const user = await Api.userService.getUser()

          onSaveUserInformation({ user, access: token, refresh: refreshToken })
        } catch (error: any) {
          const { status } = error.response

          if ([400, 401, 403].includes(status)) {
            onRefreshTokens()
          }

          console.error(error)
        }
      }

      onMounted(() => {
        if (token) {
          onLoginPreSavedUser()
        }
      })
    },
  })
</script>
