<template>
  <div class="follow-card">
    <router-link
      :to="{ name: 'user', params: { id: userFollow.id } }"
      class="avatar"
    >
      <img v-if="userFollow.avatar" :src="userFollow.avatar" alt="" />
      <img v-else src="~@/assets/image/tweet-default.png" alt="" />
    </router-link>
    <div class="card-body">
      <div class="title">
        <router-link
          :to="{ name: 'user', params: { id: userFollow.id } }"
          tag="h6"
          >{{ userFollow.name }}</router-link
        >
        <template v-if="userFollow.id !== currentUser.id">
          <button
            v-if="userFollow.isFollow"
            class="unfollow-btn"
            @click="removeFollow(userFollow.id)"
          >
            正在跟隨
          </button>
          <button v-else class="follow-btn" @click="addFollow(userFollow.id)">
            跟隨
          </button>
        </template>
      </div>
      <p>
        {{ userFollow.introduction }}
      </p>
    </div>
  </div>
</template>

<script>
import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'

export default {
  props: {
    userFollow: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
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

        this.$emit('afterAddFollow', id)
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

        this.$emit('afterRemoveFollow', id)
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
.follow-card {
  display: flex;
  padding: 16px 23px;
  border-bottom: 1px solid #e6ecf0;
}
.avatar {
  margin-right: 8px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }
}
.title {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h6 {
    color: $black;
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    cursor: pointer;
  }
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
.card-body {
  flex-grow: 1;
}
p {
  color: $black;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}
</style>
