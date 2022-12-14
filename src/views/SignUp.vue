<template>
  <div class="container">
    <section>
      <div class="logo">
        <img src="~@/assets/image/logo.png" alt="" />
      </div>
      <h3>建立你的帳號</h3>
      <user-form />
      <nav>
        <router-link to="signin" class="nav-link" href="">取消</router-link>
      </nav>
    </section>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'

// import { Toast } from '@/utils/helpers'

export default {
  components: { UserForm },
  data() {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {}
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
