import React from 'react'
import styles from './styles.module.css'

function getFormValueFor(name, event) {
  return event.target[name]?.value
}

export function validatePassword(password, confirmPassword) {
  // both inputs match
  // min length of 6
  // >= 1 uppercase character
  // >= 1 lowercase character
  // >= 1 number
  // >= 1 special character
  //    - !@#$%^&*()_-+={[}]|:;""<,>.
  const errors = []
  if (password !== confirmPassword) {
    errors.push('Passwords do not match')
  }

  if (password.length < 6) {
    errors.push('Password needs at least 6 characters')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password needs at least 1 uppercase character')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password needs at least 1 lowercase character')
  }

  if (!/[/0-9]/.test(password)) {
    errors.push('Password needs at least 1 number')
  }

  if (!/[!@#$%^&*()_\-+={[}\]|:;""<,>.]/.test(password)) {
    errors.push(
      `Password needs at least 1 of these special characters: !@#$%^&*()_-+={[}]|:;"'<,>.`
    )
  }

  return errors
}

function onPasswordSubmit(event) {
  event.preventDefault()
  const password = getFormValueFor('password', event)
  const confirmPassword = getFormValueFor('confirmPassword', event)

  const errors = validatePassword(password, confirmPassword)
  console.log(errors)
  return errors
}

export const PasswordForm = () => {
  return (
    <form className={styles['form-wrapper']} onSubmit={onPasswordSubmit}>
      <input type='password' name='password' />
      <input type='password' name='confirmPassword' />
      <button type='submit'>Submit</button>
    </form>
  )
}
