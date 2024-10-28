<template>
  <div class="login-page">
    <q-card class="login-card" flat bordered>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onLogin">
          <q-input
            v-model="username"
            label="Username"
            outlined
            :readonly="loading"
            :rules="[validateUsername]"
          />

          <q-input
            v-model="password"
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

          <q-btn
            label="Login"
            type="submit"
            color="primary"
            class="q-mt-md"
            :loading="loading"
            :disable="isDisabledLoginButton"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :disable="loading" label="Do you want create an account?" @click="onRedirectToSignUpPage" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserStore } from 'src/stores/user-store';
import { useVisibilityPassword } from 'src/composables/useVisibilityPassword';

import { validatePassword, validateUsername } from 'src/constants/validations.constants';

import Api from 'src/core/API';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const $q = useQuasar();
    const { passwordVisibility, getPasswordIcon, onChangeVisibilityOfPassword } = useVisibilityPassword();

    const username = ref<string>('');
    const password = ref<string>('');
    const loading = ref<boolean>(false);

    const isDisabledLoginButton = computed<boolean>(() => !(validatePassword(password.value) && validateUsername(username.value)));

    const onRedirectToSignUpPage = (): void => {
      router.push('/sign-up');
    };
    const onLogin = async (): Promise<void> => {
      loading.value = true;
      try {
        const { access, refresh } = await Api.authService.token(username.value, password.value);
        userStore.onSaveToken(access, refresh);

        const user = await Api.userService.getUser();
        userStore.onSaveUser(user);
        router.push('/');

        $q.notify({
          type: 'positive',
          message: 'Successful login!',
        });
      } catch (error) {
        console.error(error);
        $q.notify({
          type: 'negative',
          message: error as string,
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      username,
      password,
      passwordVisibility,

      getPasswordIcon,
      isDisabledLoginButton,

      validatePassword,
      validateUsername,

      onRedirectToSignUpPage,
      onLogin,
      onChangeVisibilityOfPassword,
    };
  },
});
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
}
</style>
