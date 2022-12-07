<template>
  <div class="modal-background">
    <div class="modal-card">
      <div class="card-header">
        <button class="close-btn" @click="clickCloseBtn">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M13.4141 11.9999L19.2071 6.20687C19.5971 5.81687 19.5971 5.18388 19.2071 4.79288C18.8171 4.40188 18.1841 4.40288 17.7931 4.79288L12.0001 10.5859L6.20712 4.79288C5.81712 4.40288 5.18412 4.40288 4.79312 4.79288C4.40212 5.18288 4.40312 5.81587 4.79312 6.20687L10.5861 11.9999L4.79312 17.7929C4.40312 18.1829 4.40312 18.8159 4.79312 19.2069C4.98812 19.4019 5.24312 19.4999 5.50012 19.4999C5.75712 19.4999 6.01212 19.4019 6.20712 19.2069L12.0001 13.4139L17.7931 19.2069C17.9881 19.4019 18.2431 19.4999 18.5001 19.4999C18.7571 19.4999 19.0121 19.4019 19.2071 19.2069C19.5971 18.8169 19.5971 18.1839 19.2071 17.7929L13.4141 11.9999Z"
            />
          </svg>
        </button>
      </div>
      <div class="card-body">
        <div class="tweet-content">
          <div class="avatar avatar__author">
            <img
              v-if="tweet.User.avatar"
              :src="tweet.User.avatar"
              alt="tweet-default"
            />
            <img
              v-else
              src="~@/assets/image/tweet-default.png"
              alt="tweet-default"
            />
          </div>
          <div class="tweet-info">
            <h6 class="title">
              {{ tweet.User.name }}
              <span>@{{ tweet.User.account }}．{{ tweet.createdAt }}</span>
            </h6>
            <p class="description">
              {{ tweet.description }}
            </p>
            <p class="reply-target">
              回覆給 <span>@{{ tweet.User.account }}</span>
            </p>
          </div>
        </div>
        <div class="reply-content">
          <div class="avatar">
            <img
              v-if="currentUser.avatar"
              :src="currentUser.avatar"
              alt="tweet-default"
            />
            <img
              v-else
              src="~@/assets/image/tweet-default.png"
              alt="tweet-default"
            />
          </div>
          <div class="input-area">
            <textarea
              v-model="text"
              class="text-area"
              name=""
              id=""
              placeholder="推你的回覆"
              @input="textValidator"
            >
            </textarea>
            <div class="reply-btn">
              <button :disabled="isBtnDisabled" @click.stop="handleClick">
                回覆
              </button>
              <span :class="{ 'error-message': isBtnDisabled }">
                {{ text.length }}/140
              </span>
              <span v-show="textOverflow" class="error-message"
                >推文不得超過 140 字</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dayjs } from '@/utils/helpers'

export default {
  data() {
    return {
      text: '',
      isBtnDisabled: true,
      textOverflow: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isReplyModalOpen', 'tweet'])
  },
  methods: {
    clickCloseBtn() {
      this.$store.commit('closeReplyModal')
    },
    textValidator() {
      if (this.text.length <= 0) {
        this.isBtnDisabled = true
        return
      } else if (this.text.length > 140) {
        this.isBtnDisabled = true
        this.textOverflow = true
        return
      }
      this.isBtnDisabled = false
      this.textOverflow = false
    },
    handleClick() {
      // TODO: API POST /tweets/:id/replies
      this.$emit('afterCreateReply', {
        id: dayjs().valueOf(),
        comment: this.text,
        UserId: this.currentUser.id,
        TweetId: this.tweet.id,
        updatedAt: dayjs().toISOString(),
        createdAt: dayjs().toISOString()
      })
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
  width: 36%;
  border-radius: 14px;
  background-color: #fff;
  position: absolute;
  top: 56px;
  right: 32%;
  overflow: hidden;
}
.card-header {
  height: 56px;
  padding: 16px 15px;
  border-bottom: 1px solid $light-blue2;
  button {
    border: 0;
    background-color: #fff;
    cursor: pointer;
  }
  svg {
    width: 24px;
    height: 24px;
    fill: $brand-color;
  }
}
.avatar {
  margin-right: 8px;
  position: relative;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  &__author::after {
    content: '';
    height: calc(100% - 35px);
    border: 1px solid $gray3;
    position: absolute;
    left: 25px;
    top: 60px;
  }
}
.tweet-content,
.reply-content {
  display: flex;
  padding: 18px 15px;
}
.tweet-info {
  .title {
    padding-bottom: 8px;
    font-size: 16px;
    font-weight: 700;
    span {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 400;
      color: $gray4;
    }
  }
  .description {
    padding-bottom: 10px;
    color: $black;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
  }
  .reply-target {
    color: $gray4;
    span {
      color: $brand-color;
    }
  }
}
.input-area {
  width: 100%;
  .text-area {
    height: 150px;
    width: 100%;
    padding-top: 12px;
    border: 0;
    resize: none;
    font-size: 18px;
    vertical-align: bottom;
    &::placeholder {
      font-size: 18px;
      font-weight: 700;
    }
    &:focus {
      outline: none;
      border: 0;
    }
  }
  .reply-btn {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    button {
      padding: 8px 16px;
      border-radius: 50px;
      font-size: 16px;
      cursor: pointer;
      border: 0;
      background-color: $brand-color;
      color: #fff;
      &:disabled {
        background-color: $gray1;
        cursor: default;
      }
    }
    span {
      margin-right: 10px;
      &.error-message {
        color: $Error;
      }
    }
  }
}
</style>
