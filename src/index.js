import React, { useState } from 'react'
import styles from './styles.module.css'

function getFormValueFor(name, event) {
  return event.target[name]?.value
}

function testConditions(...tests) {
  return function runTests(password) {
    return tests.reduce((errors, test) => {
      const error = test(password)
      if (error) {
        errors.push(error)
      }
      return errors
    }, [])
  }
}

export function validatePassword(password, confirmPassword) {
  const errors = testConditions(
    (p) => p !== confirmPassword && 'Passwords do not match',
    (p) => p.length < 6 && 'Password needs at least 6 characters',
    (p) => !/[A-Z]/.test(p) && 'Password needs at least 1 uppercase character',
    (p) => !/[a-z]/.test(p) && 'Password needs at least 1 lowercase character',
    (p) => !/[/0-9]/.test(p) && 'Password needs at least 1 number',
    (p) => !/[!@#$%^&*()_\-+={[}\]|:;""<,>.]/.test(p) && `Password needs at least 1 of these special characters: !@#$%^&*()_-+={[}]|:;"'<,>.`
  )(password)

  return errors
}

const SuccessText = () => <h4>Password verified successfully!</h4>

const ErrorList = ({errors}) => (<ul>
  {errors.map((e) => <li>{e}</li>)}
</ul>)

function onPasswordSubmit(setErrorsCallback) {
  return function _onSubmit(event) {
    event.preventDefault()
    const password = getFormValueFor('password', event)
    const confirmPassword = getFormValueFor('confirmPassword', event)
  
    const errors = validatePassword(password, confirmPassword)
    setErrorsCallback(errors)
  }
}

export const PasswordForm = () => {
  const [errors, setErrors] = useState(undefined)
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onPasswordSubmit(setErrors)}>
        <input type='password' name='password' className={styles.input}/>
        <input type='password' name='confirmPassword' className={styles.input}/>
        <button type='submit' className={styles.submit}>Submit</button>
      </form>
      <div style={{display: errors === undefined ? 'none' : 'block'}}>
        { errors?.length > 0 ? <ErrorList errors={errors} /> : <SuccessText /> }
      </div>
    </div>
  )
}
