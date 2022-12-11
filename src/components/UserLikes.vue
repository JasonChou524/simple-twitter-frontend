<template>
  <div>
    <tweet-card v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
  </div>
</template>

<script>
import TweetCard from './TweetCard.vue'

import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  components: { TweetCard },
  props: ['user'],
  data() {
    return {
      tweets: []
    }
  },
  watch: {
    user() {
      this.fetchUserLikes()
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
          RepliedCount: tweet.repliedCounts,
          LikesCount: tweet.likesCounts,
          isLiked: true,
          User: this.user
        }))
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者推文，請稍候再試'
        })
      }
    }
  }
}
</script>
