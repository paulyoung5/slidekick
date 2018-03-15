<style>
@import './../../assets/landing.css';
</style>

<template>
  <form>
    <h1>Log in</h1>

    <div v-if="error" class="error">
      <i class="material-icons">error</i>
      <span>
        {{ error }}
      </span>
    </div>

    <label>
      <input type="email" name="email" v-model="email" placeholder="Email" required="required">
      <span>Email</span>
    </label>
    <label>
      <input type="password" name="password" v-model="password" placeholder="Password" required="required" @keyup.enter.prevent="login">
      <span>Password</span>
    </label>
    <a href="#" @click.prevent="login">
      <span>Log in</span>
      <i class="material-icons">lock</i>
    </a>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { AUTHENTICATE_USER } from '@/store/mutations'

export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    ...mapActions(['setPageLoading']),
    login () {
      if (!this.$el.checkValidity() || !this.validate()) {
        this.$el.classList.add('submitted')
        return
      }

      this.$auth.login({ data: {
        email: this.email,
        password: this.password
      }}).then(res => {
        this.setPageLoading(true)
        this.$store.commit(AUTHENTICATE_USER, res)
      }).catch(err => {
        switch (err.response.status) {
          case 401:
          case 403:
            this.error = `Sorry, those details weren't recognised`
            break
          default:
            this.error = 'Sorry, something went wrong. Please check your internet connection and try again'
        }
      })
    },
    validate () {
      if (this.email.length === 0) {
        this.error = 'Please enter an email address.'
        return false
      }
      if (this.password.length === 0) {
        this.error = 'Please enter a password.'
        return false
      }
      return true
    }
  }
}
</script>
