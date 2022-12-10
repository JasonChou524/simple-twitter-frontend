<template>
  <div class="wrap">
    <div class="popular-list">
      <div class="title">
        <h4>推薦跟隨</h4>
      </div>
      <div v-for="user of users" :key="user.id" class="user-card">
        <div class="profile">
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
        </div>
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
    </div>
  </div>
</template>

<script>
const dummyUsers = [
  {
    id: 24,
    name: 'user2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    account: 'user2',
    followersCount: 4,
    Followers: [
      {
        id: 84,
        name: 'user99',
        avatar: 'https://i.imgur.com/fGVq8DU.jpeg',
        account: 'user9',
        Followship: {
          id: 314,
          followerId: 84,
          followingId: 24,
          createdAt: '2022-08-07T14:04:40.000Z',
          updatedAt: '2022-08-07T14:04:40.000Z'
        }
      },
      {
        id: 64,
        name: 'ＲＥＤ',
        avatar: 'https://i.imgur.com/oEu32YO.jpeg',
        account: 'asd',
        Followship: {
          id: 574,
          followerId: 64,
          followingId: 24,
          createdAt: '2022-08-07T16:18:15.000Z',
          updatedAt: '2022-08-07T16:18:15.000Z'
        }
      },
      {
        id: 164,
        name: 'wjy',
        avatar: 'https://i.imgur.com/1gLP1yi.jpeg',
        account: 'wjy',
        Followship: {
          id: 734,
          followerId: 164,
          followingId: 24,
          createdAt: '2022-08-10T10:21:13.000Z',
          updatedAt: '2022-08-10T10:21:13.000Z'
        }
      },
      {
        id: 14,
        name: 'Sandy',
        avatar: 'https://i.imgur.com/ljf0Tla.jpeg',
        account: 'user1',
        Followship: {
          id: 764,
          followerId: 14,
          followingId: 24,
          createdAt: '2022-09-22T06:07:05.000Z',
          updatedAt: '2022-09-22T06:07:05.000Z'
        }
      }
    ],
    isFollowed: true
  },
  {
    id: 14,
    name: 'Sandy',
    avatar: 'https://i.imgur.com/ljf0Tla.jpeg',
    account: 'user1',
    followersCount: 3,
    Followers: [
      {
        id: 64,
        name: 'ＲＥＤ',
        avatar: 'https://i.imgur.com/oEu32YO.jpeg',
        account: 'asd',
        Followship: {
          id: 564,
          followerId: 64,
          followingId: 14,
          createdAt: '2022-08-07T16:18:14.000Z',
          updatedAt: '2022-08-07T16:18:14.000Z'
        }
      },
      {
        id: 84,
        name: 'user99',
        avatar: 'https://i.imgur.com/fGVq8DU.jpeg',
        account: 'user9',
        Followship: {
          id: 614,
          followerId: 84,
          followingId: 14,
          createdAt: '2022-08-07T16:19:37.000Z',
          updatedAt: '2022-08-07T16:19:37.000Z'
        }
      },
      {
        id: 164,
        name: 'wjy',
        avatar: 'https://i.imgur.com/1gLP1yi.jpeg',
        account: 'wjy',
        Followship: {
          id: 704,
          followerId: 164,
          followingId: 14,
          createdAt: '2022-08-10T10:18:10.000Z',
          updatedAt: '2022-08-10T10:18:10.000Z'
        }
      }
    ],
    isFollowed: false
  },
  {
    id: 84,
    name: 'user99',
    avatar: 'https://i.imgur.com/fGVq8DU.jpeg',
    account: 'user9',
    followersCount: 3,
    Followers: [
      {
        id: 64,
        name: 'ＲＥＤ',
        avatar: 'https://i.imgur.com/oEu32YO.jpeg',
        account: 'asd',
        Followship: {
          id: 604,
          followerId: 64,
          followingId: 84,
          createdAt: '2022-08-07T16:19:12.000Z',
          updatedAt: '2022-08-07T16:19:12.000Z'
        }
      },
      {
        id: 164,
        name: 'wjy',
        avatar: 'https://i.imgur.com/1gLP1yi.jpeg',
        account: 'wjy',
        Followship: {
          id: 724,
          followerId: 164,
          followingId: 84,
          createdAt: '2022-08-10T10:18:14.000Z',
          updatedAt: '2022-08-10T10:18:14.000Z'
        }
      },
      {
        id: 14,
        name: 'Sandy',
        avatar: 'https://i.imgur.com/ljf0Tla.jpeg',
        account: 'user1',
        Followship: {
          id: 784,
          followerId: 14,
          followingId: 84,
          createdAt: '2022-12-01T12:25:11.000Z',
          updatedAt: '2022-12-01T12:25:11.000Z'
        }
      }
    ],
    isFollowed: true
  },
  {
    id: 34,
    name: 'user3',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    account: 'user3',
    followersCount: 2,
    Followers: [
      {
        id: 84,
        name: 'user99',
        avatar: 'https://i.imgur.com/fGVq8DU.jpeg',
        account: 'user9',
        Followship: {
          id: 324,
          followerId: 84,
          followingId: 34,
          createdAt: '2022-08-07T14:04:41.000Z',
          updatedAt: '2022-08-07T14:04:41.000Z'
        }
      },
      {
        id: 14,
        name: 'Sandy',
        avatar: 'https://i.imgur.com/ljf0Tla.jpeg',
        account: 'user1',
        Followship: {
          id: 754,
          followerId: 14,
          followingId: 34,
          createdAt: '2022-09-13T09:26:48.000Z',
          updatedAt: '2022-09-13T09:26:48.000Z'
        }
      }
    ],
    isFollowed: true
  },
  {
    id: 54,
    name: 'user5',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    account: 'user5',
    followersCount: 2,
    Followers: [
      {
        id: 14,
        name: 'Sandy',
        avatar: 'https://i.imgur.com/ljf0Tla.jpeg',
        account: 'user1',
        Followship: {
          id: 4,
          followerId: 14,
          followingId: 54,
          createdAt: '2022-08-07T13:00:41.000Z',
          updatedAt: '2022-08-07T13:00:41.000Z'
        }
      },
      {
        id: 84,
        name: 'user99',
        avatar: 'https://i.imgur.com/fGVq8DU.jpeg',
        account: 'user9',
        Followship: {
          id: 394,
          followerId: 84,
          followingId: 54,
          createdAt: '2022-08-07T14:34:36.000Z',
          updatedAt: '2022-08-07T14:34:36.000Z'
        }
      }
    ],
    isFollowed: true
  },
  {
    id: 114,
    name: '一拳超人',
    avatar: 'https://i.imgur.com/IdzljwO.jpeg',
    account: 'red2',
    followersCount: 2,
    Followers: [
      {
        id: 64,
        name: 'ＲＥＤ',
        avatar: 'https://i.imgur.com/oEu32YO.jpeg',
        account: 'asd',
        Followship: {
          id: 534,
          followerId: 64,
          followingId: 114,
          createdAt: '2022-08-07T16:17:30.000Z',
          updatedAt: '2022-08-07T16:17:30.000Z'
        }
      },
      {
        id: 14,
        name: 'Sandy',
        avatar: 'https://i.imgur.com/ljf0Tla.jpeg',
        account: 'user1',
        Followship: {
          id: 774,
          followerId: 14,
          followingId: 114,
          createdAt: '2022-11-13T12:00:09.000Z',
          updatedAt: '2022-11-13T12:00:09.000Z'
        }
      }
    ],
    isFollowed: true
  },
  {
    id: 44,
    name: 'user4',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    account: 'user4',
    followersCount: 1,
    Followers: [
      {
        id: 84,
        name: 'user99',
        avatar: 'https://i.imgur.com/fGVq8DU.jpeg',
        account: 'user9',
        Followship: {
          id: 334,
          followerId: 84,
          followingId: 44,
          createdAt: '2022-08-07T14:04:42.000Z',
          updatedAt: '2022-08-07T14:04:42.000Z'
        }
      }
    ],
    isFollowed: false
  },
  {
    id: 64,
    name: 'ＲＥＤ',
    avatar: 'https://i.imgur.com/oEu32YO.jpeg',
    account: 'asd',
    followersCount: 1,
    Followers: [
      {
        id: 14,
        name: 'Sandy',
        avatar: 'https://i.imgur.com/ljf0Tla.jpeg',
        account: 'user1',
        Followship: {
          id: 484,
          followerId: 14,
          followingId: 64,
          createdAt: '2022-08-07T16:03:20.000Z',
          updatedAt: '2022-08-07T16:03:20.000Z'
        }
      }
    ],
    isFollowed: true
  },
  {
    id: 94,
    name: 'red1',
    avatar: null,
    account: 'red1',
    followersCount: 0,
    Followers: [],
    isFollowed: false
  },
  {
    id: 144,
    name: 'red11',
    avatar: null,
    account: 'red11',
    followersCount: 0,
    Followers: [],
    isFollowed: false
  }
]
export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      // TODO: API /users limit=10
      this.users = dummyUsers.map((user) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        account: user.account,
        isFollowed: user.isFollowed
      }))
    },
    addFollow(id) {
      this.users = this.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            isFollowed: true
          }
        }
        return user
      })
    },
    removeFollow(id) {
      this.users = this.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            isFollowed: false
          }
        }
        return user
      })
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
