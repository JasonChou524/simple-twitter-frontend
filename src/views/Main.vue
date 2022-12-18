<template>
  <div class="main-container">
    <div class="row">
      <nav-tabs class="col-3" @clickCreateBtn="openCreateModal" />
      <div class="main col-6">
        <div class="title">
          <h4>首頁</h4>
        </div>
        <tweet-create-card
          class="tweet-create-card"
          @afterCreateTweet="afterCreateTweet"
        />
        <tweet-card
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          @afterAddLike="afterAddLike"
          @afterRemoveLike="afterRemoveLike"
        />
      </div>
      <user-popular class="col-3" />
    </div>
    <tweet-create-modal
      v-if="isCreateModalShow"
      @afterCreateTweet="afterCreateTweet"
      @clickCloseBtn="closeCreateModal"
    />
    <tweet-reply-modal
      v-if="isReplyModalOpen"
      @afterCreateReply="afterCreateReply"
    />
  </div>
</template>

<script>
import NavTabs from '@/components/NavTabs.vue'
import UserPopular from '@/components/UserPopular.vue'
import TweetCard from '@/components/TweetCard.vue'
import TweetCreateCard from '@/components/TweetCreateCard.vue'
import TweetCreateModal from '@/components/TweetCreateModal.vue'
import TweetReplyModal from '@/components/TweetReplyModal.vue'

import tweetsAPI from '@/apis/tweets'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'Main',
  components: {
    NavTabs,
    UserPopular,
    TweetCard,
    TweetCreateCard,
    TweetCreateModal,
    TweetReplyModal
  },
  data() {
    return {
      tweets: [],
      isCreateModalShow: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isReplyModalOpen'])
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getTweets()
        this.tweets = data.map((tweet) => ({
          id: tweet.id,
          description: tweet.description,
          createdAt: tweet.createdAt,
          User: tweet.User,
          RepliesCount: tweet.replyCount,
          LikesCount: tweet.likeCount,
          isLiked: tweet.isLiked
        }))
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文列表，請稍候再試'
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
    afterCreateTweet(newTweet) {
      this.tweets.unshift(newTweet)
      this.isCreateModalShow = false
    },
    openCreateModal() {
      this.isCreateModalShow = true
    },
    closeCreateModal() {
      this.isCreateModalShow = false
    },
    afterCreateReply(newReply) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === newReply.TweetId) {
          return {
            ...tweet,
            RepliesCount: tweet.RepliesCount + 1
          }
        }
        return tweet
      })
      this.$store.commit('closeReplyModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.main {
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  .title {
    height: 74px;
    padding: 24px;
    border-left: 1px solid $light-blue2;
    border-right: 1px solid $light-blue2;
    border-bottom: 1px solid $light-blue2;
    backdrop-filter: blur(3px);
    font-weight: 700;
    position: sticky;
    top: 0;
  }
  .tweet-create-card {
    border-bottom: 10px solid $light-blue2;
  }
}
</style>
