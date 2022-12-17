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
          type="email"
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
          :required="!user.isEdit"
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
          :required="!user.isEdit"
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

export default {
  props: {
    isProcessing: {
      type: Boolean,
      required: true
    }
  },
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
      }
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
    handleSubmit() {
      console.log('handleSubmit')
      this.$emit('after-submit', this.user)
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
