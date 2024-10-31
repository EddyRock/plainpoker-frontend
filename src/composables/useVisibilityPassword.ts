import { ref, computed } from 'vue'

import {
  EPasswordType,
  PASSWORD_ICONS,
  type TPasswordTypes,
} from 'src/constants/password-visibility.constants'

export function useVisibilityPassword() {
  const passwordVisibility = ref<TPasswordTypes>(EPasswordType.PASSWORD)

  const getPasswordIcon = computed<string>(
    () => PASSWORD_ICONS[passwordVisibility.value]
  )

  const onChangeVisibilityOfPassword = (): void => {
    if (passwordVisibility.value === EPasswordType.PASSWORD) {
      passwordVisibility.value = EPasswordType.TEXT
    } else {
      passwordVisibility.value = EPasswordType.PASSWORD
    }
  }

  return {
    passwordVisibility,

    getPasswordIcon,

    onChangeVisibilityOfPassword,
  }
}
