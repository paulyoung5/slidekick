<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <label>First Name (*):
      <input type="text" name="first_name" v-model="forename">
    </label>
    <label>Surname (*):
      <input type="text" name="surname" v-model="surname">
    </label>
    <label>Email (*):
      <input type="email" name="email" v-model="email">
    </label>
    <label>Password (*):
      <input type="password" name="password" v-model="password">
    </label>
    <label>Password Confirmation (*):
      <input type="password" name="password_confirm" v-model="password_confirm">
    </label>
    <a href="#" @click.prevent="register">Register</a>
  </div>
</template>

<script>
import { AUTHENTICATE_USER } from '@/store/mutations'

export default {
  name: 'RegistrationForm',
  data () {
    return {
      forename: '',
      surname: '',
      email: '',
      password: '',
      password_confirm: '',
      error: ''
    }
  },
  methods: {
    register () {
      if (!this.validate()) return

      this.$auth.register({ data: {
        forename: this.forename,
        surname: this.surname,
        email: this.email,
        password: this.password
      }})
        .then(res => {
          this.$store.commit(AUTHENTICATE_USER, res)
        })
        // eslint-disable-next-line
        .catch(err => this.error = err.message)
    },
    validate () {
      if (this.forename.length === 0) {
        this.error = 'Please enter a first name.'
        return false
      }
      if (this.surname.length === 0) {
        this.error = 'Please enter a surname.'
        return false
      }
      if (this.email.length === 0) {
        this.error = 'Please enter an email address.'
        return false
      }
      if (this.password.length === 0 || (this.password !== this.password_confirm)) {
        this.error = 'Please ensure that passwords are non-empty and match.'
        return false
      }
      this.error = ''
      return true
    }
  }
}
</script>
