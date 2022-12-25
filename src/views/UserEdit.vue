<template>
  <div class="edit-container">
    <div class="row">
      <nav-tabs class="col-3" @clickCreateBtn="openCreateModal" />
      <section class="col-6">
        <div class="edit">
          <div class="title">
            <h4>帳戶設定</h4>
          </div>
          <user-form @after-submit="userEdit" :is-processing="isProcessing" />
        </div>
      </section>
    </div>
    <tweet-create-modal
      v-if="isCreateModalShow"
      @clickCloseBtn="closeCreateModal"
      @afterCreateTweet="closeCreateModal"
    />
  </div>
</template>

<script>
import NavTabs from '@/components/NavTabs.vue'
import UserForm from '@/components/UserForm.vue'
import TweetCreateModal from '@/components/TweetCreateModal.vue'

import { mapState } from 'vuex'
import { Toast } from '@/utils/helpers'
import usersAPI from '@/apis/users'

export default {
  components: {
    NavTabs,
    UserForm,
    TweetCreateModal
  },
  data() {
    return {
      editData: {},
      isProcessing: false,
      isCreateModalShow: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async userEdit(user) {
      try {
        this.formValidator(user)
        if (!Object.keys(this.editData).length) {
          return
        }

        this.isProcessing = true

        const { data } = await usersAPI.userEdit({
          id: this.currentUser.id,
          editData: this.editData
        })

        if (data.status === 'error') {
          throw new Error(data)
        }

        // TODO: currentUser data change

        Toast.fire({
          icon: 'success',
          title: '編輯成功'
        })
        this.$router.push('/')
      } catch (error) {
        const { data } = error.response
        Toast.fire({
          icon: 'error',
          title: `${data.message}`
        })
        this.isProcessing = false
      }
    },
    formValidator(user) {
      // 帳號、姓名、信箱空白檢測
      if (!user.account.trim() || !user.name.trim() || !user.email.trim()) {
        Toast.fire({
          icon: 'error',
          title: '帳號、名稱和信箱不可空白'
        })
        return
      }

      // 密碼與確認密碼驗證
      if (user.password.trim() !== user.checkPassword.trim()) {
        Toast.fire({
          icon: 'error',
          title: '兩次輸入的密碼不同'
        })
        return
      }

      if (user.password.trim()) {
        this.editData.password = user.password
        this.editData.checkPassword = user.checkPassword
      }

      if (this.currentUser.account !== user.account) {
        this.editData.account = user.account
      }

      if (this.currentUser.name !== user.name) {
        this.editData.name = user.name
      }

      if (this.currentUser.email !== user.email) {
        this.editData.email = user.email
      }
    },
    openCreateModal() {
      this.isCreateModalShow = true
    },
    closeCreateModal() {
      this.isCreateModalShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.edit {
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  border-right: 1px solid $light-blue2;
  border-left: 1px solid $light-blue2;
  &::-webkit-scrollbar {
    width: 0;
  }
  .title {
    padding: 24px;
    border-bottom: 1px solid $light-blue2;
    color: $black;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
  }
  form {
    margin: 20px auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
