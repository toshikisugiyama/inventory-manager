<template lang="pug">
//- login
section.login(v-if="tab === 0")
  h1.login__title ログイン
  form.login__form.form(@submit.prevent="login")
    div.login__form__item.form__item.email
      label
        span Eメールアドレス
        input#login-email(type="text" v-model="loginForm.email")
    div.login__form__item.form__item.password
      label
        span パスワード
        input#login-password(type="text" v-model="loginForm.password")
    div.login__form__item.form__item.button
      button(type="submit") ログイン
  ul.login__tab.tab
    li.login__tab__item.tab__item(:class="{'active' : tab===0}" @click="tab=0") ログイン
    li.login__tab__item.tab__item(:class="{'active' : tab===1}" @click="tab=1") サインアップ
//- register
section.register(v-else)
  h1.register__title サインアップ
  form.register__form.form(@submit.prevent="register")
    div.register__form__item.form__item.name
      label
        span 名前
        input#register-name(type="text" v-model="registerForm.name")
    div.register__form__item.form__item.email
      label
        span Eメールアドレス
        input#register-email(type="text" v-model="registerForm.email")
    div.register__form__item.form__item.password
      label
        span パスワード
        input#register-password(type="text" v-model="registerForm.password")
    div.register__form__item.form__item.password_confirmation
      label
        span パスワード（確認）
        input#register-password-confirmation(type="text" v-model="registerForm.password_confirmation")
    div.register__form__item.form__item.button
      button(type="submit") サインアップ
  ul.register__tab.tab
    li.register__tab__item.tab__item(:class="{'active' : tab===0}" @click="tab=0") ログイン
    li.register__tab__item.tab__item(:class="{'active' : tab===1}" @click="tab=1") サインアップ
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      tab: 0,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    apiStatus () {
      return this.$store.state.auth.apiStatus
    }
  },
  methods: {
    async login () {
      await this.$store.dispatch('auth/login', this.loginForm)
      if (this.apiStatus === true) {
        this.$router.push('/')
      }
    },
    async register () {
      await this.$store.dispatch('auth/register', this.registerForm)
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
.login,
.register {
  width: 300px;
  margin: 0 auto;
  padding: 40px 10px;
  &__title {
    text-align: center;
    margin-bottom: 30px;
  }
}
.form {
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  &__item {
    margin: 0 0 20px 0;
  }
  & label {
    display: flex;
    flex-direction: column;
    span {
      margin: 0 0 5px 0;
    }
  }
  &__item.button {
    text-align: center;
  }
}
.tab {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 0 auto;
  position: relative;
  &::after {
    content: '/';
    display: block;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
  &__item {
    cursor: pointer;
    color: #707070;
    width: 48%;
    text-align: center;
  }
  &__item.active {
    color: #333;
  }
}
</style>
