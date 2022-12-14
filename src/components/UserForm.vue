<template>
  <form @submit.prevent.stop="handleSubmit">
    <ul>
      <li class="input-area account">
        <label for="account">帳號</label>
        <input
          v-model="user.account"
          type="text"
          id="account"
          name="account"
          placeholder="請輸入帳號"
          required
        />
      </li>
      <li class="input-area name">
        <label for="name">使用者名稱</label>
        <input
          v-model="user.name"
          type="text"
          id="name"
          name="name"
          placeholder="請輸入使用者名稱"
          required
        />
      </li>
      <li class="input-area email">
        <label for="email">Email</label>
        <input
          v-model="user.email"
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 Email"
          required
        />
      </li>
      <li class="input-area password">
        <label for="password">密碼</label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          name="password"
          placeholder="請輸入密碼"
          required
        />
      </li>
      <li class="input-area checkPassword">
        <label for="password">密碼確認</label>
        <input
          v-model="user.checkPassword"
          type="password"
          id="checkPassword"
          name="checkPassword"
          placeholder="請再次輸入密碼"
          required
        />
      </li>
    </ul>
    <div class="btn">
      <button
        v-if="user.isEdit"
        class="edit-btn"
        type="submit"
        :disabled="isProcessing"
      >
        儲存
      </button>
      <button v-else class="signup-btn" type="submit" :disabled="isProcessing">
        註冊
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'

export default {
  data() {
    return {
      user: {
        id: -1,
        name: '',
        account: '',
        email: '',
        password: '',
        checkPassword: '',
        isEdit: false
      },
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      if (this.currentUser.id !== -1) {
        this.user = {
          ...this.currentUser,
          password: '',
          checkPassword: '',
          isEdit: true
        }
      }
    },
    async handleSubmit() {
      try {
        if (
          !this.user.account.trim() ||
          !this.user.name.trim() ||
          !this.user.email.trim() ||
          !this.user.password.trim() ||
          !this.user.checkPassword.trim()
        ) {
          Toast.fire({
            icon: 'warning',
            title: '欄位不可為空'
          })
          this.isProcessing = false
          return
        }
        if (this.user.name && this.user.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '名稱字數不能超過 50 '
          })
          this.isProcessing = false
          return
        }
        if (this.user.password.length < 4) {
          Toast.fire({
            icon: 'warning',
            title: '密碼長度不得小於 4'
          })
          this.user.password = ''
          this.user.checkPassword = ''
          this.isProcessing = false
          return
        }
        if (this.user.password !== this.user.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '兩次輸入的密碼不同'
          })
          this.user.password = ''
          this.user.checkPassword = ''
          this.isProcessing = false
          return
        }
        this.isProcessing = true

        const { data } = await authorizationAPI.signUp({
          account: this.user.account,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          checkPassword: this.user.checkPassword
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
.btn {
  display: flex;
  flex-direction: row-reverse;
  button {
    width: 100%;
    height: 45px;
    padding: 8px 24px;
    background-color: $brand-color;
    border: 0;
    border-radius: 50px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
    &.edit-btn {
      width: 88px;
    }
  }
}
</style>
