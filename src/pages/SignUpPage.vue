<template>
  <div class="sign-up-page">
    <q-card class="q-pa-lg q-mx-auto sign-up-page__card">
      <q-card-section>
        <div class="text-h6">Sign Up</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset">
          <q-input
            v-model="form.username"
            label="Username"
            outlined
            :readonly="loading"
            :rules="[validateUsername]"
            lazy-rules
          />

          <q-input
            v-model="form.first_name"
            label="First Name"
            outlined
            :readonly="loading"
            :rules="[(val) => isRequired(val) && isValidLength(val)]"
            lazy-rules
          />

          <q-input
            v-model="form.last_name"
            label="Last Name"
            outlined
            :readonly="loading"
            :rules="[(val) => isRequired(val) && isValidLength(val)]"
            lazy-rules
          />

          <q-input
            v-model="form.email"
            label="Email"
            outlined
            type="email"
            :readonly="loading"
            :rules="[(val) => validateEmail(val)]"
            lazy-rules
          />

          <q-input
            v-model="form.password"
            label="Password"
            bottom-slots
            outlined
            :type="passwordVisibility"
            :rules="[validatePassword]"
            :readonly="loading"
          >
            <template v-slot:append>
              <q-icon
                :name="getPasswordIcon"
                @click="onChangeVisibilityOfPassword"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <q-input
            v-model="form.password2"
            label="Repeat Password"
            bottom-slots
            outlined
            :type="passwordVisibility"
            :rules="[
              validatePassword,
              () => isValuesTheSame(form.password, form.password2),
            ]"
            :readonly="loading"
          >
            <template v-slot:append>
              <q-icon
                :name="getPasswordIcon"
                @click="onChangeVisibilityOfPassword"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <q-btn
            label="Sign Up"
            :disable="isDisabledRegisterButton"
            type="submit"
            color="primary"
            class="q-mt-md"
          />

          <q-btn label="Reset" type="reset" flat class="q-ml-sm q-mt-md" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Already have an account?"
          @click="onRedirectToLoginPage"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'

  import { useRouter } from 'vue-router'

  import {
    validateUsername,
    isRequired,
    isValidLength,
    validateEmail,
    validatePassword,
    isValuesTheSame,
  } from 'src/constants/validations.constants'

  import Api from 'src/core/API'

  import { useUserStore } from 'src/stores/user-store'
  import { useVisibilityPassword } from 'src/composables/useVisibilityPassword'

  import { type IUserForm } from 'src/core/API/AuthService'

  export default defineComponent({
    setup() {
      const router = useRouter()
      const userStore = useUserStore()
      const {
        passwordVisibility,
        getPasswordIcon,
        onChangeVisibilityOfPassword,
      } = useVisibilityPassword()

      const form = ref<IUserForm>({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
      })
      const loading = ref<boolean>(false)

      const isDisabledRegisterButton = computed<boolean>(() => {
        const {
          username = '',
          first_name = '',
          last_name = '',
          email = '',
          password = '',
          password2 = '',
        } = form.value ?? {}

        return !(
          validateUsername(username) &&
          isRequired(first_name) &&
          isValidLength(first_name) &&
          isRequired(last_name) &&
          isValidLength(last_name) &&
          validatePassword(password) &&
          password === password2 &&
          validateEmail(email)
        )
      })

      const onRedirectToLoginPage = (): void => {
        router.push('/login')
      }
      const onSubmit = async (): Promise<void> => {
        loading.value = true

        try {
          const user = await Api.authService.register(form.value)
          userStore.onSaveUser(user)

          const { access, refresh } = await Api.authService.token(
            form.value.username,
            form.value.password
          )
          userStore.onSaveToken(access, refresh)

          router.push('/')
        } catch (error: any) {
          // TODO: Fix error type
          console.error(error)
        } finally {
          loading.value = false
        }
      }
      const onReset = (): void => {
        form.value = {
          username: '',
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password2: '',
        }
      }

      return {
        form,
        loading,
        passwordVisibility,

        validateUsername,
        validatePassword,
        isRequired,
        isValidLength,
        isValuesTheSame,
        validateEmail,

        onSubmit,
        onReset,
        onRedirectToLoginPage,
        onChangeVisibilityOfPassword,

        isDisabledRegisterButton,
        getPasswordIcon,
      }
    },
  })
</script>

<style lang="scss" scoped>
  // TODO: Move it to special file for the css which repeats
  .sign-up-page {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    &__card {
      width: 100%;
      max-width: 400px;
    }
  }
</style>
