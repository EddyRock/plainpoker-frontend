const MAX_LENGTH = 12
const MIN_LENGTH = 3

// TODO: Add an dictionary for the answers
export const isMinimumLength = (value: string): boolean =>
  value.length >= MAX_LENGTH
export const hasCharacterVariety = (value: string): boolean => {
  const hasUppercase = /[A-Z]/.test(value)
  const hasLowercase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value)

  const count = [hasUppercase, hasLowercase, hasNumber, hasSymbol].filter(
    (rule) => rule
  ).length
  return count >= 3
}
export const isRequired = (value: string): boolean => !!value
export const isValidLength = (
  value: string,
  minLength = MIN_LENGTH,
  maxLength = MAX_LENGTH
): boolean => value.length >= minLength && value.length <= maxLength
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean =>
  isMinimumLength(password) &&
  hasCharacterVariety(password) &&
  isRequired(password)
export const validateUsername = (username: string): boolean =>
  isValidLength(username) && isRequired(username)
export const isValuesTheSame = (
  value: unknown,
  secondValue: unknown
): boolean => value === secondValue
