# password-verifier

A small library for verifying passwords. Exposes a simple form (`PasswordForm`) with a submit button and two inputs to type your password and confirm it, and also exposes the actual function (`validatePassword`) for verifying two given strings both meet the requirements outlined below and match each other for implementation with your own components.

Password Requirements:

- At least 6 characters
- At least 1 uppercase character
- At least 1 lowercase character
- At least 1 number
- At least 1 of these special characters: `!@#$%^&*()_-+={[}]|:;"'<,>.`