<template>
  <div class="modal-background">
    <form @submit.stop.prevent="handleSubmit($event)" class="modal-card">
      <div class="card-header">
        <button class="close-btn" @click="clickCloseBtn" type="button">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M13.4141 11.9999L19.2071 6.20687C19.5971 5.81687 19.5971 5.18388 19.2071 4.79288C18.8171 4.40188 18.1841 4.40288 17.7931 4.79288L12.0001 10.5859L6.20712 4.79288C5.81712 4.40288 5.18412 4.40288 4.79312 4.79288C4.40212 5.18288 4.40312 5.81587 4.79312 6.20687L10.5861 11.9999L4.79312 17.7929C4.40312 18.1829 4.40312 18.8159 4.79312 19.2069C4.98812 19.4019 5.24312 19.4999 5.50012 19.4999C5.75712 19.4999 6.01212 19.4019 6.20712 19.2069L12.0001 13.4139L17.7931 19.2069C17.9881 19.4019 18.2431 19.4999 18.5001 19.4999C18.7571 19.4999 19.0121 19.4019 19.2071 19.2069C19.5971 18.8169 19.5971 18.1839 19.2071 17.7929L13.4141 11.9999Z"
            />
          </svg>
        </button>
        <h4>編輯個人資料</h4>
        <button class="submit-btn" type="submit">儲存</button>
      </div>
      <div class="card-image">
        <div class="avatar">
          <img v-if="formData.avatar" :src="formData.avatar" alt="" />
          <img v-else src="@/assets/image/tweet-default.png" alt="" />
          <label for="avatar" class="svg-btn">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083H6.438C7.633 3.17 9.722 2 12 2C14.277 2 16.367 3.17 17.562 5.083H19.708C20.972 5.083 22 6.11 22 7.375V19.708C22 20.972 20.972 22 19.708 22ZM4.292 6.583C3.855 6.583 3.5 6.938 3.5 7.375V19.708C3.5 20.145 3.855 20.5 4.292 20.5H19.708C20.145 20.5 20.5 20.145 20.5 19.708V7.375C20.5 6.938 20.145 6.583 19.708 6.583H17.258C16.941 6.633 16.626 6.488 16.476 6.201C15.596 4.536 13.882 3.501 12 3.501C10.117 3.501 8.402 4.536 7.524 6.203C7.364 6.505 7.022 6.663 6.691 6.583H4.293H4.292Z"
              />
              <path
                d="M11.9999 8.16699C9.31989 8.16699 7.13989 10.347 7.13989 13.027C7.13989 15.707 9.31989 17.887 11.9999 17.887C14.6799 17.887 16.8599 15.707 16.8599 13.027C16.8599 10.347 14.6799 8.16699 11.9999 8.16699ZM13.9999 13.75H12.7499V15C12.7499 15.414 12.4139 15.75 11.9999 15.75C11.5859 15.75 11.2499 15.414 11.2499 15V13.75H9.99989C9.58589 13.75 9.24989 13.414 9.24989 13C9.24989 12.586 9.58589 12.25 9.99989 12.25H11.2499V11C11.2499 10.586 11.5859 10.25 11.9999 10.25C12.4139 10.25 12.7499 10.586 12.7499 11V12.25H13.9999C14.4139 12.25 14.7499 12.586 14.7499 13C14.7499 13.414 14.4139 13.75 13.9999 13.75Z"
              />
            </svg>
            <input
              id="avatar"
              name="avatar"
              type="file"
              style="display: none"
              @change="uploadImage('avatar', $event)"
            />
          </label>
        </div>
        <img
          v-if="formData.frontCover"
          class="front-cover"
          :src="formData.frontCover"
          alt=""
        />
        <img
          v-else
          class="front-cover"
          src="@/assets/image/front-cover.png"
          alt=""
        />
        <div class="front-cover-btn">
          <label for="front-cover" class="svg-btn">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083H6.438C7.633 3.17 9.722 2 12 2C14.277 2 16.367 3.17 17.562 5.083H19.708C20.972 5.083 22 6.11 22 7.375V19.708C22 20.972 20.972 22 19.708 22ZM4.292 6.583C3.855 6.583 3.5 6.938 3.5 7.375V19.708C3.5 20.145 3.855 20.5 4.292 20.5H19.708C20.145 20.5 20.5 20.145 20.5 19.708V7.375C20.5 6.938 20.145 6.583 19.708 6.583H17.258C16.941 6.633 16.626 6.488 16.476 6.201C15.596 4.536 13.882 3.501 12 3.501C10.117 3.501 8.402 4.536 7.524 6.203C7.364 6.505 7.022 6.663 6.691 6.583H4.293H4.292Z"
              />
              <path
                d="M11.9999 8.16699C9.31989 8.16699 7.13989 10.347 7.13989 13.027C7.13989 15.707 9.31989 17.887 11.9999 17.887C14.6799 17.887 16.8599 15.707 16.8599 13.027C16.8599 10.347 14.6799 8.16699 11.9999 8.16699ZM13.9999 13.75H12.7499V15C12.7499 15.414 12.4139 15.75 11.9999 15.75C11.5859 15.75 11.2499 15.414 11.2499 15V13.75H9.99989C9.58589 13.75 9.24989 13.414 9.24989 13C9.24989 12.586 9.58589 12.25 9.99989 12.25H11.2499V11C11.2499 10.586 11.5859 10.25 11.9999 10.25C12.4139 10.25 12.7499 10.586 12.7499 11V12.25H13.9999C14.4139 12.25 14.7499 12.586 14.7499 13C14.7499 13.414 14.4139 13.75 13.9999 13.75Z"
              />
            </svg>
            <input
              id="front-cover"
              name="front_cover"
              type="file"
              style="display: none"
              @change="uploadImage('frontCover', $event)"
            />
          </label>

          <button
            class="svg-btn clear-btn"
            type="button"
            @click="clearFrontCover"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M13.4141 11.9999L19.2071 6.20687C19.5971 5.81687 19.5971 5.18388 19.2071 4.79288C18.8171 4.40188 18.1841 4.40288 17.7931 4.79288L12.0001 10.5859L6.20712 4.79288C5.81712 4.40288 5.18412 4.40288 4.79312 4.79288C4.40212 5.18288 4.40312 5.81587 4.79312 6.20687L10.5861 11.9999L4.79312 17.7929C4.40312 18.1829 4.40312 18.8159 4.79312 19.2069C4.98812 19.4019 5.24312 19.4999 5.50012 19.4999C5.75712 19.4999 6.01212 19.4019 6.20712 19.2069L12.0001 13.4139L17.7931 19.2069C17.9881 19.4019 18.2431 19.4999 18.5001 19.4999C18.7571 19.4999 19.0121 19.4019 19.2071 19.2069C19.5971 18.8169 19.5971 18.1839 19.2071 17.7929L13.4141 11.9999Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <ul class="card-input">
        <li class="input-area name">
          <label for="name">名稱</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            name="name"
            placeholder="請輸入使用者名稱"
            required
          />
          <p>{{ formData.name.length }}/50</p>
        </li>
        <li class="input-area introduction">
          <label for="introduction">自我介紹</label>
          <textarea
            v-model="formData.introduction"
            class="introduction"
            id="introduction"
            name="introduction"
            placeholder="請輸入自我介紹"
          />
          <p>{{ formData.introduction.length }}/160</p>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'
export default {
  props: ['user'],
  data() {
    return {
      formData: {}
    }
  },
  created() {
    this.formData = { ...this.user }
  },
  methods: {
    clickCloseBtn() {
      this.$emit('clickCloseBtn')
    },
    async handleSubmit(e) {
      try {
        if (this.formData.name.trim().length === 0) {
          Toast.fire({
            icon: 'error',
            title: '名稱不能空白'
          })
          return
        }
        if (this.formData.introduction.trim().length === 0) {
          Toast.fire({
            icon: 'error',
            title: '自我介紹不能空白'
          })
          return
        }
        if (
          this.formData.name === this.user.name &&
          this.formData.introduction === this.user.introduction &&
          this.formData.avatar === this.user.avatar &&
          this.formData.frontCover === this.user.frontCover
        ) {
          Toast.fire({
            icon: 'error',
            title: '沒有修改任何資料'
          })
          return
        }
        const form = e.target
        const formData = new FormData(form)
        const id = this.$route.params.id
        const { data } = await usersAPI.userEdit({ id, editData: formData })
        if (data.status === 'error') {
          throw new Error(data)
        }
        this.$store.commit('setCurrentUser', data.newData)
        this.$emit('handleSubmit')
        this.$emit('clickCloseBtn')
      } catch (error) {
        const { data } = error.response
        console.log(data.message)
        Toast.fire({
          icon: 'error',
          title: `${data.message}`
        })
      }
    },
    clearFrontCover() {
      this.formData.frontCover = ''
    },
    uploadImage(type, e) {
      const img = e.target.files[0]
      if (img) {
        const imgURL = window.URL.createObjectURL(img)
        this.formData[type] = imgURL
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-background {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modal-card {
  width: 40%;
  max-width: 650px;
  border-radius: 14px;
  background-color: #fff;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  overflow: hidden;
  .svg-btn {
    border: 0;
    background-color: transparent;
    fill: #fff;
  }
}
.card-header {
  height: 56px;
  padding: 16px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $light-blue2;
  position: relative;
  h4 {
    color: $black;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
  }
  button.close-btn {
    width: 24px;
    height: 24px;
    margin-right: 36px;
    padding: 0;
    border: 0;
    background-color: #fff;
    cursor: pointer;
    svg {
      vertical-align: center;
    }
  }
  button.submit-btn {
    height: 40px;
    padding: 8px 16px;
    background-color: $brand-color;
    border: 0;
    border-radius: 50px;
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    position: absolute;
    top: 8px;
    right: 16px;
    cursor: pointer;
  }
  svg {
    width: 24px;
    height: 24px;
    fill: $brand-color;
  }
}
.card-image {
  position: relative;
  .avatar {
    width: 140px;
    height: 140px;
    border: 4px solid #fff;
    border-radius: 100px;
    position: absolute;
    top: 130px;
    left: 20px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      border-radius: 100px;
    }
    label {
      position: absolute;
      top: 40%;
      left: 42%;
      cursor: pointer;
    }
  }
  img.front-cover {
    height: 200px;
    width: 100%;
    margin-bottom: 80px;
  }
  .front-cover-btn {
    position: absolute;
    top: 40%;
    right: 50%;
    transform: translate(50%, -50%);
    label,
    button {
      cursor: pointer;
      svg {
        width: 24px;
        height: 24px;
      }
    }
    label {
      margin-right: 35px;
    }
  }
}
.card-input {
  padding: 0 16px;
  .input-area {
    width: 100%;
    height: 54px;
    margin-bottom: 32px;
    padding: 2px 10px;
    border-bottom: 2px solid $gray1;
    border-radius: 0px 0px 4px 4px;
    background-color: $gray-white3;
    position: relative;
    display: flex;
    flex-direction: column;
    &:has(.introduction) {
      height: 147px;
    }
    label {
      color: $gray1;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
    input,
    textarea {
      height: 100%;
      width: 100%;
      padding: 0;
      padding-top: 5px;
      background-color: $gray-white3;
      border: 0;
      color: $black;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      &.introduction {
        height: 125px;
        white-space: pre-wrap;
        resize: none;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: $gray3;
      }
    }
    p {
      display: block;
      width: 100%;
      padding-top: 10px;
      color: $gray1;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      position: absolute;
      bottom: -25px;
      right: 0px;
      white-space: pre;
    }
  }
}
</style>
