<template>
  <div class="container">
    <section>
      <div class="logo">
        <img src="~@/assets/image/logo.png" alt="" />
      </div>
      <h3>建立你的帳號</h3>
      <user-form :is-processing="isProcessing" @after-submit="userSignUp" />
      <nav>
        <router-link to="signin" class="nav-link" href="">取消</router-link>
      </nav>
    </section>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'

import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'

export default {
  components: { UserForm },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    async userSignUp(user) {
      try {
        if (
          !user.account.trim() ||
          !user.name.trim() ||
          !user.email.trim() ||
          !user.password.trim() ||
          !user.checkPassword.trim()
        ) {
          Toast.fire({
            icon: 'warning',
            title: '欄位不可為空'
          })
          this.isProcessing = false
          return
        }
        if (user.name && user.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '名稱字數不能超過 50 '
          })
          this.isProcessing = false
          return
        }
        if (user.password.length < 4) {
          Toast.fire({
            icon: 'warning',
            title: '密碼長度不得小於 4'
          })
          user.password = ''
          user.checkPassword = ''
          this.isProcessing = false
          return
        }
        if (user.password !== user.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '兩次輸入的密碼不同'
          })
          user.password = ''
          user.checkPassword = ''
          this.isProcessing = false
          return
        }
        this.isProcessing = true

        const { data } = await authorizationAPI.signUp({
          account: user.account,
          name: user.name,
          email: user.email,
          password: user.password,
          checkPassword: user.checkPassword
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '帳號註冊成功'
        })

        this.$router.push('/signin')
      } catch (error) {
        // TODO: 表單錯誤驗證（顯示在 input 下）
        Toast.fire({
          icon: 'error',
          title: `${error.response.data.message}`
        })
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 356px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo {
  margin: 64px auto 24px auto;
  img {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }
}
h3 {
  font-weight: 700;
  line-height: 26px;
  text-align: center;
  margin-bottom: 40px;
}
.input-area {
  width: 100%;
  height: 54px;
  margin-bottom: 32px;
  padding: 2px 10px;
  border-bottom: 2px solid $gray1;
  border-radius: 0px 0px 4px 4px;
  background-color: $gray-white3;
  display: flex;
  flex-direction: column;
  label {
    color: $gray1;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
  input {
    height: 100%;
    background-color: $gray-white3;
    border: 0;
    color: $black;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: $gray3;
    }
  }
}
button {
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
  padding: 8px 24px;
  background-color: $brand-color;
  border: 0;
  border-radius: 50px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  cursor: pointer;
}
nav {
  margin-top: 22px;
  display: flex;
  justify-content: center;
  .nav-link {
    color: $Primary;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-decoration: underline solid $Primary;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
  }
}
</style>
