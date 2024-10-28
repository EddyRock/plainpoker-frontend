<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="onRedirectToMainPage" class="pointer"> PlainPoker </q-toolbar-title>
        <q-space />

        <user-menu />
      </q-toolbar>
    </q-header>

    <q-page-container class="flex justify-center">
        <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useRouter } from 'vue-router';

import UserMenu from 'src/components/UserMenu/UserMenu.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    UserMenu,
  },
  setup() {
    const router = useRouter();

    const onRedirectToMainPage = (): void => {
      router.push('/');
    };

    return {
      onRedirectToMainPage,
    };
  },
});
</script>
