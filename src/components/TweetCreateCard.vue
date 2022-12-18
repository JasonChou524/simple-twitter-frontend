<template>
  <div class="create-tweet-card">
    <div class="card-body">
      <router-link
        :to="{ name: 'user', params: { id: currentUser.id } }"
        class="avatar"
      >
        <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="" />
        <img v-else src="~@/assets/image/tweet-default.png" alt="" />
      </router-link>
      <textarea
        v-model="text"
        class="text"
        name=""
        id=""
        placeholder="有什麼新鮮事？"
        @input="textValidator"
      >
      </textarea>
    </div>
    <div class="card-footer">
      <button :disabled="isBtnDisabled" @click="handleButtonClick">推文</button>
      <span :class="{ errorMessage: isBtnDisabled }">
        {{ textLength }}/140
      </span>
      <span v-show="textOverflow" class="errorMessage"
        >推文不得超過 140 字</span
      >
    </div>
  </div>
</template>

<script>
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import tweetsAPI from '@/apis/tweets'

export default {
  data() {
    return {
      text: '',
      isBtnDisabled: true,
      textOverflow: false
    }
  },
  computed: {
    ...mapState(['currentUser']),
    textLength() {
      return this.text.length
    }
  },
  methods: {
    async handleButtonClick() {
      try {
        const { data } = await tweetsAPI.createTweet({ description: this.text })

        if (data.status === 'error') {
          throw new Error(data)
        }

        Toast.fire({
          icon: 'success',
          title: '成功建立推文'
        })

        const { tweet } = data

        const newTweet = {
          id: tweet.id,
          description: tweet.description,
          createdAt: tweet.createdAt,
          User: this.currentUser,
          isLiked: false,
          LikesCount: 0,
          RepliesCount: 0
        }
        this.$emit('afterCreateTweet', newTweet)
        this.text = ''
        this.isBtnDisabled = true
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍候再試'
        })
      }
    },
    textValidator() {
      if (this.textLength <= 0) {
        this.isBtnDisabled = true
        this.textOverflow = false
        return
      } else if (this.textLength > 140) {
        this.isBtnDisabled = true
        this.textOverflow = true
        return
      }
      this.isBtnDisabled = false
      this.textOverflow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.create-tweet-card {
  padding: 16px 25px;
  border-left: 1px solid $light-blue2;
  border-right: 1px solid $light-blue2;
}
.card-body {
  display: flex;
  .avatar {
    margin-right: 8px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  .text {
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
}
.card-footer {
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
    &.errorMessage {
      color: $Error;
    }
  }
}
</style>
