<style>
@import './../../assets/landing.css';
</style>

<template>
  <form>
    <h1>Sign up</h1>
    
    <div v-if="error" class="error">
      <i class="material-icons">error</i>
      <span>
        {{ error }}
      </span>
    </div>

    <label>
      <input type="text" name="first_name" v-model="forename" placeholder="First name" required="required">
      <span>First name</span>
    </label>
    <label>
      <input type="text" name="surname" v-model="surname" placeholder="Surname" required="required">
      <span>Surname</span>
    </label>
    <label>
      <input type="email" name="email" v-model="email" placeholder="Email" required="required">
      <span>Email</span>
    </label>
    <label>
      <input type="password" name="password" v-model="password" placeholder="Password" required="required">
      <span>Password</span>
    </label>
    <label>
      <input type="password" name="password_confirm" v-model="password_confirm" placeholder="Confirm password" required="required">
      <span>Confirm Password</span>
    </label>
    <a href="#" @click.prevent="register">
      <span>Register</span>
      <i class="material-icons">lock</i>
    </a>
  </form>
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
      if (!this.validate() || !this.$el.checkValidity()) {
        this.$el.classList.add('submitted')
        return
      }

      this.$auth.register({ data: {
        forename: this.forename,
        surname: this.surname,
        email: this.email,
        password: this.password
      }})
        .then(res => this.$store.commit(AUTHENTICATE_USER, res))
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
