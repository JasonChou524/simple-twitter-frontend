<template>
  <div class="tweet-container">
    <div class="row">
      <nav-tabs class="col-3" />
      <section class="col-6">
        <div class="tweet">
          <div class="title">
            <a @click="$router.go(-1)">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M20 10.9999H7.41399L11.707 6.70687C12.097 6.31687 12.097 5.68388 11.707 5.29288C11.317 4.90188 10.684 4.90288 10.293 5.29288L4.29299 11.2929C3.90299 11.6829 3.90299 12.3159 4.29299 12.7069L10.293 18.7069C10.488 18.9019 10.743 18.9999 11 18.9999C11.257 18.9999 11.512 18.9019 11.707 18.7069C12.097 18.3169 12.097 17.6839 11.707 17.2929L7.41399 12.9999H20C20.553 12.9999 21 12.5529 21 11.9999C21 11.4469 20.553 10.9999 20 10.9999Z"
                />
              </svg>
            </a>
            <h4>推文</h4>
          </div>
          <div class="tweet-detail">
            <div class="header">
              <router-link
                :to="{ name: 'user', params: { id: tweet.User.id } }"
                class="avatar"
              >
                <img v-if="tweet.User.avatar" :src="tweet.User.avatar" alt="" />
                <img v-else src="~@/assets/image/tweet-default.png" alt="" />
              </router-link>
              <router-link
                :to="{ name: 'user', params: { id: tweet.User.id } }"
                class="user-info"
              >
                <h6>{{ tweet.User.name }}</h6>
                <p>@{{ tweet.User.account }}</p>
              </router-link>
            </div>
            <p class="description">
              {{ tweet.description }}
            </p>
            <p class="create-time">{{ createdAtTime }}・{{ createdAtDate }}</p>
            <div class="tweet-info">
              <p class="reply-count">
                <span>{{ tweet.replyCount }}</span> 回覆
              </p>
              <p class="like-count">
                <span>{{ tweet.likeCount }}</span> 喜歡次數
              </p>
            </div>
            <div class="footer">
              <div class="reply-btn" @click="openReplyModal">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path
                    d="M17.5576 2.80254L12.3726 2.79004H12.3701C6.90262 2.79004 2.62012 7.07379 2.62012 12.5425C2.62012 17.665 6.60262 21.55 11.9514 21.755V26.54C11.9514 26.675 12.0064 26.8975 12.1014 27.0438C12.2789 27.325 12.5814 27.4775 12.8914 27.4775C13.0639 27.4775 13.2376 27.43 13.3939 27.33C13.7239 27.12 21.4851 22.155 23.5039 20.4475C25.8814 18.435 27.3039 15.485 27.3076 12.5575V12.5363C27.3001 7.07754 23.0201 2.80254 17.5576 2.80129V2.80254ZM22.2914 19.0175C20.8739 20.2175 16.2139 23.2738 13.8264 24.8213V20.8375C13.8264 20.32 13.4076 19.9 12.8889 19.9H12.3939C7.81887 19.9 4.49637 16.805 4.49637 12.5425C4.49637 8.12504 7.95637 4.66504 12.3714 4.66504L17.5551 4.67754H17.5576C21.9726 4.67754 25.4326 8.13504 25.4351 12.5475C25.4314 14.935 24.2576 17.3525 22.2926 19.0175H22.2914Z"
                  />
                </svg>
              </div>
              <div
                v-if="tweet.isLiked"
                class="remove-like-btn"
                @click="fetchRemoveLike(tweet.id)"
              >
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path
                    d="M15 27.0478H14.9825C11.7538 26.9878 2.4375 18.5703 2.4375 10.5978C2.4375 6.76777 5.59375 3.40527 9.19125 3.40527C12.0538 3.40527 13.9788 5.38027 14.9987 6.81777C16.0162 5.38277 17.9412 3.40527 20.805 3.40527C24.405 3.40527 27.56 6.76777 27.56 10.599C27.56 18.569 18.2425 26.9865 15.0138 27.0453H15V27.0478Z"
                    fill="#FC5A5A"
                  />
                </svg>
              </div>
              <div v-else class="like-btn" @click="fetchAddLike(tweet.id)">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path
                    d="M15 27.0473H14.9825C11.7537 26.9873 2.4375 18.5698 2.4375 10.5973C2.4375 6.76728 5.59375 3.40479 9.19125 3.40479C12.0537 3.40479 13.9787 5.37979 14.9987 6.81729C16.0162 5.38229 17.9412 3.40479 20.805 3.40479C24.405 3.40479 27.56 6.76729 27.56 10.5985C27.56 18.5685 18.2425 26.986 15.0137 27.0448H15V27.0473ZM9.1925 5.28104C6.5925 5.28104 4.31375 7.76603 4.31375 10.5998C4.31375 17.7748 13.1062 25.0948 15.0012 25.1723C16.8987 25.0948 25.6887 17.776 25.6887 10.5998C25.6887 7.76603 23.41 5.28104 20.81 5.28104C17.65 5.28104 15.885 8.95104 15.87 8.98729C15.5825 9.68979 14.425 9.68979 14.1362 8.98729C14.1187 8.94979 12.355 5.28104 9.19375 5.28104H9.1925Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <reply-card
            v-for="reply in tweet.Replies"
            :key="reply.id"
            :reply="reply"
            :tweet-account="tweet.User.account"
          />
        </div>
      </section>
      <user-popular class="col-3" />
    </div>
    <tweet-reply-modal
      v-if="isReplyModalOpen"
      @afterCreateReply="afterCreateReply"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserPopular from '../components/UserPopular.vue'
import ReplyCard from '../components/ReplyCard.vue'
import TweetReplyModal from '../components/TweetReplyModal.vue'

import { mapState, mapMutations, mapActions } from 'vuex'
import { dayjs } from '@/utils/helpers'

export default {
  components: {
    NavTabs,
    UserPopular,
    ReplyCard,
    TweetReplyModal
  },
  computed: {
    ...mapState(['tweet', 'isReplyModalOpen']),
    createdAtDate() {
      return dayjs(this.tweet.createdAt).format('ll')
    },
    createdAtTime() {
      return dayjs(this.tweet.createdAt).format('A HH:MM')
    }
  },
  created() {
    const TweetId = this.$route.params.id
    this.fetchTweet(TweetId)
  },
  methods: {
    ...mapMutations(['openReplyModal', 'closeReplyModal', 'createReply']),
    ...mapActions(['fetchTweet', 'fetchAddLike', 'fetchRemoveLike']),
    afterCreateReply(newReply) {
      this.createReply(newReply)
      this.closeReplyModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.tweet {
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  border-right: 1px solid $light-blue2;
  border-left: 1px solid $light-blue2;
  &::-webkit-scrollbar {
    width: 0;
  }
  .title {
    height: 74px;
    padding: 24px;
    border-bottom: 1px solid $light-blue2;
    display: flex;
    backdrop-filter: blur(3px);
    font-weight: 700;
    position: sticky;
    top: 0;
    a {
      cursor: pointer;
    }
    svg {
      width: 24px;
      height: 24px;
    }
    h4 {
      margin-left: 16px;
    }
  }
}
// tweet-detail
.tweet-detail {
  padding: 16px;
  border-bottom: 1px solid $light-blue2;
}
.header {
  display: flex;
  padding-bottom: 8px;
  .avatar {
    margin-right: 8px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    h6 {
      color: $black;
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
    }
    p {
      color: $Secondary;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
  }
}
.description {
  color: $black;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
}
.create-time {
  padding: 8px 0;
  border-bottom: 1px solid $light-blue2;
  color: $Secondary;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.tweet-info {
  padding: 16px 0;
  border-bottom: 1px solid $light-blue2;
  display: flex;
  font-size: 19px;
  p {
    margin-right: 24px;
    color: $Secondary;
    font-weight: 500;
    font-family: Noto Sans TC, sans-serif;
  }
  span {
    color: #000;
    font-weight: 700;
    font-family: Montserrat, sans-serif;
  }
}
.footer {
  padding: 19px 0 4px 0;
  display: flex;
  .reply-btn {
    margin-right: 130px;
    &:hover svg {
      fill: $brand-color;
    }
  }
  .like-btn {
    &:hover svg {
      fill: $Error;
    }
  }
  svg {
    width: 30px;
    height: 30px;
    fill: $Secondary;
    cursor: pointer;
  }
}
</style>
