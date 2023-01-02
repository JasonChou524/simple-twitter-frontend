<template>
  <div>
    <template v-if="isLoading">
      <spinner />
    </template>
    <template v-else>
      <reply-card
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
        :tweetAccount="reply.Tweet.User.account"
      />
    </template>
  </div>
</template>

<script>
import ReplyCard from './ReplyCard.vue'
import Spinner from './Spinner.vue'

import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  components: { ReplyCard, Spinner },
  props: ['user'],
  data() {
    return {
      replies: [],
      isLoading: true
    }
  },
  created() {
    this.fetchUserReplies()
  },
  watch: {
    user() {
      this.fetchUserReplies()
    }
  },
  methods: {
    async fetchUserReplies() {
      try {
        const { data } = await usersAPI.getUserReplies({ id: this.user.id })
        this.replies = data.map((reply) => ({
          ...reply,
          User: this.user
        }))
        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者回覆，請稍候再試'
        })
      }
    }
  }
}
</script>
