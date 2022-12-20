<template>
  <div>
    <tweet-card
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      @afterAddLike="afterAddLike"
      @afterRemoveLike="afterRemoveLike"
    />
  </div>
</template>

<script>
import TweetCard from './TweetCard.vue'

import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  components: { TweetCard },
  props: ['user', 'reply'],
  data() {
    return {
      tweets: []
    }
  },
  watch: {
    user() {
      this.fetchUserTweets()
    },
    reply() {
      this.afterCreateReply()
    }
  },
  methods: {
    async fetchUserTweets() {
      try {
        const { data } = await usersAPI.getUserTweets({ id: this.user.id })
        this.tweets = data.map((tweet) => ({
          ...tweet,
          User: this.user
        }))
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者推文，請稍候再試'
        })
      }
    },
    afterAddLike(id) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: true,
            LikesCount: tweet.LikesCount + 1
          }
        }
        return tweet
      })
    },
    afterRemoveLike(id) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: false,
            LikesCount: tweet.LikesCount - 1
          }
        }
        return tweet
      })
    },
    afterCreateReply() {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === this.reply.TweetId) {
          return {
            ...tweet,
            RepliesCount: tweet.RepliesCount + 1
          }
        }
        return tweet
      })
    }
  }
}
</script>

<style></style>
