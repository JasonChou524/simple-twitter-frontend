<template>
  <div class="container">
    <form @submit.prevent.stop="handleSubmit">
      <div class="logo">
        <img src="~@/assets/image/logo.png" alt="" />
      </div>
      <h3>登入 Alphitter</h3>
      <div class="input-area account">
        <label for="account">帳號</label>
        <input
          v-model="account"
          type="text"
          id="account"
          name="account"
          placeholder="請輸入帳號"
          required
        />
      </div>
      <div class="input-area password">
        <label for="password">密碼</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          placeholder="請輸入密碼"
          required
        />
      </div>
      <button type="submit" :disabled="isProcessing">登入</button>
      <nav>
        <a class="nav-link" href="">後台登入</a>
        <p>．</p>
        <a class="nav-link" href="">註冊</a>
      </nav>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'

export default {
  data() {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account.trim() || !this.password.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '帳號與密碼不可為空'
          })
          return
        }
        this.isProcessing = true

        const { data } = await authorizationAPI.signIn({
          account: this.account,
          password: this.password
        })

        const { id, account, name, email, avatar, role } = data.user

        localStorage.setItem('token', data.token)

        this.$store.commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          avatar,
          role
        })

        this.$router.push('/')
      } catch (error) {
        // 將密碼欄位清空
        this.password = ''
        // 顯示錯誤提示
        Toast.fire({
          icon: 'error',
          title: '帳號或密碼錯誤'
        })
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
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
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
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
