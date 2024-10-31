export enum EPasswordIcons {
  VISIBILITY = 'visibility',
  VISIBILITY_OFF = 'visibility_off',
}

export enum EPasswordType {
  TEXT = 'text',
  PASSWORD = 'password',
}

export const PASSWORD_ICONS: Record<string, string> = {
  [EPasswordType.TEXT]: EPasswordIcons.VISIBILITY,
  [EPasswordType.PASSWORD]: EPasswordIcons.VISIBILITY_OFF,
}

export type TPasswordTypes =
  | 'text'
  | 'password'
  | 'textarea'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'number'
  | 'url'
  | 'time'
  | 'date'
  | 'datetime-local'
