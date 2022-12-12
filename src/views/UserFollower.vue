<template>
  <div class="user-container">
    <div class="row">
      <nav-tabs class="col-3" />
      <section class="col-6">
        <div class="user-following">
          <nav class="header">
            <a href="">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M20 10.9999H7.41399L11.707 6.70687C12.097 6.31687 12.097 5.68388 11.707 5.29288C11.317 4.90188 10.684 4.90288 10.293 5.29288L4.29299 11.2929C3.90299 11.6829 3.90299 12.3159 4.29299 12.7069L10.293 18.7069C10.488 18.9019 10.743 18.9999 11 18.9999C11.257 18.9999 11.512 18.9019 11.707 18.7069C12.097 18.3169 12.097 17.6839 11.707 17.2929L7.41399 12.9999H20C20.553 12.9999 21 12.5529 21 11.9999C21 11.4469 20.553 10.9999 20 10.9999Z"
                />
              </svg>
            </a>
            <div class="title">
              <h6>John Doe</h6>
              <p>25 推文</p>
            </div>
          </nav>
          <nav class="navtabs">
            <ul>
              <li active-class="active">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'user-follower',
                    params: { id: $route.params.id }
                  }"
                  >追隨者</router-link
                >
              </li>
              <li active-class="active">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'user-following',
                    params: { id: $route.params.id }
                  }"
                  >正在追隨</router-link
                >
              </li>
            </ul>
          </nav>
          <follow-card
            v-for="userFollower in userFollowers"
            :key="userFollower.id"
            :user-follow="userFollower"
          />
        </div>
      </section>
      <user-popular class="col-3" />
    </div>
  </div>
</template>

<script>
import NavTabs from '@/components/NavTabs.vue'
import UserPopular from '@/components/UserPopular.vue'
import FollowCard from '@/components/FollowCard.vue'

import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    NavTabs,
    UserPopular,
    FollowCard
  },
  data() {
    return {
      userFollowers: []
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUserFollower(id)
  },
  methods: {
    async fetchUserFollower(id) {
      try {
        const { data } = await usersAPI.getUserFollowers({ id })
        this.userFollowers = data.map((userFollower) => ({
          id: userFollower.followerId,
          avatar: userFollower.followerAvatar,
          name: userFollower.followerName,
          introduction: userFollower.followerIntroduction,
          isFollow: userFollower.isFollower
        }))
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得追蹤者，請稍候再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.user-following {
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
</style>
