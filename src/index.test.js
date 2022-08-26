import { validatePassword } from '.'

describe('validatePassword', () => {
  const validPassword = 'Abc!23'
  // Happy path
  it('returns no errors for a valid, matching password', () => {
    expect(validatePassword(validPassword, validPassword)).toHaveLength(0)
  })

  // length
  it('returns an error if the password is less than 6 characters long', () => {
    expect(validatePassword('Abc!2', 'Abc!2')).toContain('Password needs at least 6 characters')
  })
  it('returns no error if the password is 6 characters or more in length', () => {
    expect(validatePassword(validPassword, validPassword)).not.toContain('Password needs at least 6 characters')
  })

  // 1 uppercase character
  it('returns an error if the password is missing an uppercase character', () => {
    expect(validatePassword('abc!23', 'abc!23')).toContain('Password needs at least 1 uppercase character')
  })
  it('returns no error if the password has an uppercase character', () => {
    expect(validatePassword(validPassword, validPassword)).not.toContain('Password needs at least 1 uppercase character')
  })

  // 1 lowercase character
  it('returns an error if the password is missing a lowercase character', () => {
    expect(validatePassword('ABC!23', 'ABC!23')).toContain('Password needs at least 1 lowercase character')
  })
  it('returns no error if the password has a lowercase character', () => {
    expect(validatePassword(validPassword, validPassword)).not.toContain('Password needs at least 1 lowercase character')
  })

  // 1 number
  it('returns an error if the password is missing a number', () => {
    expect(validatePassword('Abcde!', 'Abcde!')).toContain('Password needs at least 1 number')
  })
  it('returns no error if the password has a number', () => {
    expect(validatePassword(validPassword, validPassword)).not.toContain('Password needs at least 1 lowercase character')
  })

  // 1 special character
  it('returns an error if the password is missing a special character', () => {
    expect(validatePassword('Abc123', 'Abc123')).toContain(`Password needs at least 1 of these special characters: !@#$%^&*()_-+={[}]|:;"'<,>.`)
  })
  it('returns no error if the password has one of the allowed special characters', () => {
    expect(validatePassword(validPassword, validPassword)).not.toContain(`Password needs at least 1 of these special characters: !@#$%^&*()_-+={[}]|:;"'<,>.`)
  })

  // matching passwords
  it('returns an error for valid, mismatching passwords', () => {
    expect(validatePassword(validPassword, validPassword + '!')).toContain('Passwords do not match');
  })
  it('returns no error for invalid, matching passwords', () => {
    expect(validatePassword('abcdefg', 'abcdefg')).not.toContain('Passwords do not match');
  })

  // all errors
  it('returns list of all relevant errors', () => {
    const result = validatePassword('abcdefg', 'abcdefg')
    expect(result).toHaveLength(3)
    expect(result).toContain(`Password needs at least 1 of these special characters: !@#$%^&*()_-+={[}]|:;"'<,>.`)
    expect(result).toContain('Password needs at least 1 number')
    expect(result).toContain('Password needs at least 1 uppercase character')
  })
})
