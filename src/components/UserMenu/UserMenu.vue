<template>
  <q-btn no-caps flat v-if="isAuthorized">
    <div class="q-mr-sm">{{ getUserFullName || getUserEmail }}</div>
    <q-avatar color="blue" text-color="white">{{ getUserInitials }}</q-avatar>

    <q-menu persistent auto-close>
      <q-list>
        <q-item v-if="getUserFullName" dense>
          <q-item-section>{{ getUserFullName }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>{{ getUserEmail }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="onLogOut">
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  import { useUserStore } from 'src/stores/user-store'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup() {
      const router = useRouter()
      const userStore = useUserStore()
      const q = useQuasar()

      const isAuthorized = computed<boolean>(() => userStore.isAuthorized)
      const getUserFullName = computed<string>(() => {
        const { first_name = '', last_name = '' } = userStore.getUser ?? {}
        if (first_name && last_name) {
          return `${first_name} ${last_name}`
        }
        return ''
      })
      const getUserEmail = computed<string>(() => {
        const { email = '' } = userStore.getUser ?? {}
        return email
      })
      const getUserInitials = computed<string>(() => {
        const { first_name = '', last_name = '' } = userStore.getUser ?? {}
        if (first_name && last_name) {
          return `${first_name[0]}${last_name[0]}`
        }
        return getUserEmail.value[0]?.toLocaleUpperCase() || ''
      })

      const onLogOut = (): void => {
        q.dialog({
          title: 'Confirm',
          message: 'Are you sure?',
          cancel: true,
          persistent: true,
        }).onOk(() => {
          userStore.onClearUser()
          userStore.onClearToken()

          router.push('/login')
        })
      }

      return {
        isAuthorized,
        getUserFullName,
        getUserInitials,
        getUserEmail,

        onLogOut,
      }
    },
  })
</script>
