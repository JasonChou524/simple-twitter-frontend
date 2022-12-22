<template>
  <div class="user-container">
    <div class="row">
      <nav-tabs class="col-3" @afterCreateTweet="afterCreateTweet" />
      <section class="col-6">
        <div class="user">
          <nav class="header">
            <a @click="$router.go(-1)">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M20 10.9999H7.41399L11.707 6.70687C12.097 6.31687 12.097 5.68388 11.707 5.29288C11.317 4.90188 10.684 4.90288 10.293 5.29288L4.29299 11.2929C3.90299 11.6829 3.90299 12.3159 4.29299 12.7069L10.293 18.7069C10.488 18.9019 10.743 18.9999 11 18.9999C11.257 18.9999 11.512 18.9019 11.707 18.7069C12.097 18.3169 12.097 17.6839 11.707 17.2929L7.41399 12.9999H20C20.553 12.9999 21 12.5529 21 11.9999C21 11.4469 20.553 10.9999 20 10.9999Z"
                />
              </svg>
            </a>
            <div class="title">
              <h6>{{ user.name }}</h6>
              <p>{{ user.tweetsCount }} 推文</p>
            </div>
          </nav>
          <div class="img-wrap">
            <img
              v-if="user.frontCover"
              class="front-cover"
              :src="user.frontCover"
              alt=""
            />
            <img
              v-else
              class="front-cover"
              src="~@/assets/image/front-cover.png"
              alt=""
            />
            <div class="avatar">
              <img v-if="user.avatar" :src="user.avatar" alt="" />
              <img v-else src="~@/assets/image/tweet-default.png" alt="" />
            </div>
          </div>
          <div class="user-card">
            <div v-if="pageUserId === currentUser.id" class="card-header">
              <button>編輯個人資料</button>
            </div>
            <div v-else class="card-header">
              <button
                v-if="user.isFollowed"
                class="unfollow-btn"
                @click="removeFollow(user.id)"
              >
                正在跟隨
              </button>
              <button v-else class="follow-btn" @click="addFollow(user.id)">
                跟隨
              </button>
            </div>
            <div class="card-body">
              <h6>{{ user.name }}</h6>
              <p class="account">@{{ user.account }}</p>
              <p>
                {{ user.introduction }}
              </p>
              <div class="follow-info">
                <router-link
                  :to="{
                    name: 'user-following',
                    params: { id: $route.params.id }
                  }"
                  >{{ user.followingsCount }} 個<span>跟隨中</span></router-link
                >
                <router-link
                  :to="{
                    name: 'user-follower',
                    params: { id: $route.params.id }
                  }"
                  >{{ user.Followers.length }} 位<span
                    >跟隨者</span
                  ></router-link
                >
              </div>
            </div>
          </div>
          <nav class="navtabs">
            <ul>
              <li active-class="active">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'user-tweets',
                    params: { id: $route.params.id }
                  }"
                  replace
                  >推文</router-link
                >
              </li>
              <li active-class="active">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'user-replies',
                    params: { id: $route.params.id }
                  }"
                  replace
                  >回覆</router-link
                >
              </li>
              <li active-class="active">
                <router-link
                  class="nav-link"
                  :to="{ name: 'user-likes', params: { id: $route.params.id } }"
                  replace
                  >喜歡的內容</router-link
                >
              </li>
            </ul>
          </nav>
          <router-view :user="user" :newTweet="newTweet" :reply="reply" />
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
import NavTabs from '@/components/NavTabs.vue'
import UserPopular from '@/components/UserPopular.vue'
import TweetReplyModal from '@/components/TweetReplyModal.vue'

import { mapState, mapMutations } from 'vuex'
import usersAPI from '@/apis/users'
import { Toast } from './../utils/helpers'

export default {
  components: {
    NavTabs,
    UserPopular,
    TweetReplyModal
  },
  data() {
    return {
      user: {
        id: -1,
        name: '',
        tweetsCount: 0,
        account: '',
        introduction: '',
        front_cover: '',
        avatar: '',
        followingsCount: '',
        Followers: '',
        isFollowed: false
      },
      reply: {},
      newTweet: {}
    }
  },
  computed: {
    ...mapState(['currentUser', 'isReplyModalOpen']),
    pageUserId() {
      return Number(this.$route.params.id)
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id
    this.fetchUser(userId)
    next()
  },
  methods: {
    ...mapMutations(['openReplyModal', 'closeReplyModal', 'createReply']),
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getUser({ id: userId })
        const {
          id,
          name,
          tweetsCount,
          account,
          introduction,
          avatar,
          followingsCount,
          Followers,
          isFollowed
        } = data
        const frontCover = data.front_cover
        this.user = {
          id,
          name,
          tweetsCount,
          account,
          introduction,
          frontCover,
          avatar,
          followingsCount,
          Followers,
          isFollowed
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得個人資料，請稍後再試'
        })
        this.$router.push('/')
      }
    },
    async addFollow(id) {
      try {
        const { data } = await usersAPI.addFollow({ id })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '追隨成功'
        })

        this.user.isFollowed = true
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '追隨失敗，請稍候再試'
        })
      }
    },
    async removeFollow(id) {
      try {
        const { data } = await usersAPI.removeFollow({ id })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '移除追隨成功'
        })

        this.user.isFollowed = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '移除追隨失敗，請稍候再試'
        })
      }
    },
    afterCreateTweet(newTweet) {
      if (this.$route.params.id === this.currentUser.id) {
        this.newTweet = { ...newTweet }
      }
    },
    afterCreateReply(newReply) {
      this.reply = { ...newReply }
      this.createReply(newReply)
      this.closeReplyModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-background {
  z-index: 10;
}
.user-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.user {
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  border-right: 1px solid $light-blue2;
  border-left: 1px solid $light-blue2;
  &::-webkit-scrollbar {
    width: 0;
  }
  h6 {
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    color: $black;
  }
  nav.header {
    height: 74px;
    padding: 24px;
    border-bottom: 1px solid $light-blue2;
    display: flex;
    align-items: center;
    backdrop-filter: blur(3px);
    font-weight: 700;
    position: sticky;
    z-index: 5;
    top: 0;
    svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    .title {
      margin-left: 16px;
      p {
        font-size: 13px;
        font-weight: 500;
        line-height: 19px;
        color: $Secondary;
      }
    }
  }
  .img-wrap {
    width: 100%;
    position: relative;
    z-index: 0;
    .front-cover {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .avatar {
      width: 140px;
      height: 140px;
      border: 3px solid #fff;
      border-radius: 100px;
      position: absolute;
      bottom: -70px;
      left: 16px;
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100px;
      }
    }
  }
  .card-header {
    padding: 16px;
    display: flex;
    flex-direction: row-reverse;
    button {
      padding: 8px 16px;
      border: 1px solid $brand-color;
      border-radius: 50px;
      background-color: #fff;
      color: $brand-color;
      font-size: 16px;
      cursor: pointer;
      &.unfollow-btn {
        background-color: $brand-color;
        color: #fff;
      }
      &.follow-btn {
        border: 1px solid $brand-color;
        background-color: #fff;
        color: $brand-color;
      }
    }
  }
  .card-body {
    padding: 0 16px;
    p,
    a {
      margin-bottom: 6px;
      color: $black;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      &.account {
        margin-bottom: 8px;
        color: $Secondary;
      }
    }
    .follow-info {
      display: flex;
      a {
        margin-right: 20px;
      }
      span {
        color: $Secondary;
      }
    }
  }
  .navtabs {
    .nav-link {
      color: $gray4;
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
    }
    ul {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $light-blue2;
    }
    li {
      width: 130px;
      padding: 15px 0;
      text-align: center;
      &:has(.router-link-active) {
        border-bottom: 2px solid $brand-color;
      }
      .router-link-active {
        color: $brand-color;
      }
    }
  }
}
</style>
