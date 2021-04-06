export default function validate(credentials, isReset) {
  let errors = {}

  // Checking if email is not empty
  if (!credentials.email) {
    errors.emailIsEmpty = 'You need to enter your e-mail address'
  }
  // Checking if email format is valid
  if (credentials.email && !/\S+@\S+\.\S+/.test(credentials.email)) {
    errors.emailFormatInvalid = "Your e-mail format doesn't seem right"
  }

  // Don't check password if user is resetting password
  if (!isReset) {
    // Checking if password is not empty
    if (!credentials.password) {
      errors.passIsEmpty = 'You need a password'
    }
  }

  return errors
}
