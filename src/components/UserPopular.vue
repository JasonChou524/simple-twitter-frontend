<template>
  <div class="wrap">
    <spinner v-if="isLoading" />
    <div v-else class="popular-list">
      <div class="title">
        <h4>推薦跟隨</h4>
      </div>
      <div v-for="user of users" :key="user.id" class="user-card">
        <router-link
          :to="{ name: 'user', params: { id: user.id } }"
          class="profile"
        >
          <div class="avatar">
            <img v-if="user.avatar" :src="user.avatar" alt="user's avatar" />
            <img
              v-else
              src="~@/assets/image/tweet-default.png"
              alt="user's avatar"
            />
          </div>
          <div class="info">
            <h6>{{ user.name }}</h6>
            <p>@{{ user.account }}</p>
          </div>
        </router-link>
        <template v-if="user.id !== currentUser.id">
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'

import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    Spinner
  },
  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getPopularUsers()
        if (data.status === 'error') {
          throw new Error(data)
        }
        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          account: user.account,
          isFollowed: user.isFollowed
        }))
        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得熱門使用者，請稍候再試'
        })
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

        this.users = this.users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              isFollowed: true
            }
          }
          return user
        })
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

        this.users = this.users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              isFollowed: false
            }
          }
          return user
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '移除追隨失敗，請稍候再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 16px 24px;
}
.popular-list {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: $near-white;
  .title {
    border-bottom: 1px solid #e6ecf0;
    padding: 24px;
    font-weight: 700;
  }
}
.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  button {
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    &.unfollow-btn {
      border: 0;
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
.profile {
  display: flex;
  align-items: center;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      vertical-align: middle;
    }
  }
  h6 {
    font-size: 16px;
    font-weight: 700;
    color: $black;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    color: $gray2;
  }
}
</style>
