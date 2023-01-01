<template>
  <div>
    <template v-if="isLoading">
      <spinner />
    </template>
    <template v-else>
      <tweet-card
        v-for="tweet in tweets"
        :key="tweet.id"
        :tweet="tweet"
        @afterAddLike="afterAddLike"
        @afterRemoveLike="afterRemoveLike"
      />
    </template>
  </div>
</template>

<script>
import TweetCard from './TweetCard.vue'
import Spinner from './Spinner.vue'

import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  components: { TweetCard, Spinner },
  props: ['user', 'reply'],
  data() {
    return {
      tweets: [],
      isLoading: true
    }
  },
  created() {
    this.fetchUserLikes()
  },
  watch: {
    user() {
      this.fetchUserLikes()
    },
    reply() {
      this.afterCreateReply()
    }
  },
  methods: {
    async fetchUserLikes() {
      try {
        const { data } = await usersAPI.getUserLikes({ id: this.user.id })
        this.tweets = data.map((tweet) => ({
          id: tweet.TweetId,
          description: tweet.description,
          createdAt: tweet.createdAt,
          RepliesCount: tweet.repliedCount,
          LikesCount: tweet.likesCount,
          isLiked: true,
          User: this.user
        }))
        this.isLoading = false
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
