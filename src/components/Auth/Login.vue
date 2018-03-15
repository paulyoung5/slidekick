<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <label>Email (*):
      <input type="email" name="email" v-model="email">
    </label>
    <label>Password (*):
      <input type="password" name="password" v-model="password">
    </label>
    <a href="#" @click.prevent="login">Log in</a>
  </div>
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
  created () {
    this.setPageLoading(false)
  },
  methods: {
    ...mapActions(['setPageLoading']),
    login () {
      if (!this.validate()) return

      this.$auth.login({ data: {
        email: this.email,
        password: this.password
      }})
        .then(res => {
          this.setPageLoading(true)
          this.$store.commit(AUTHENTICATE_USER, res)
        })
        // eslint-disable-next-line
        .catch(err => this.error = err.message)
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
