<template>
  <div>
    <reply-card
      v-for="reply in replies"
      :key="reply.id"
      :reply="reply"
      :tweetAccount="reply.Tweet.User.account"
    />
  </div>
</template>

<script>
import ReplyCard from './ReplyCard.vue'

import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  components: { ReplyCard },
  props: ['user'],
  data() {
    return {
      replies: []
    }
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
          // {
          //   "id": 1, // Reply Id
          //   "comment": "123", // Reply comment
          //   "createdAt": "2022-08-02T16:49:11.000Z", // Reply 更新時間
          //   "Tweet": {
          //       "id": 1, // 該篇推文ID
          //       "User": {
          //           "id": 1, // 該篇推文使用者的 ID
          //           "account": "8", // 該篇推文使用者的 帳號
          //       }
          //   }
          // }
          ...reply,
          User: this.user
        }))
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
