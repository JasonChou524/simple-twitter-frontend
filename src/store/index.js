import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const dummyUser = {
  id: 2,
  account: 'user1',
  name: 'user1',
  email: 'user1@example.com',
  avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  role: 'user'
}

const dummyTweet = {
  id: 1,
  UserId: 2,
  description: 'laboriosam qui eveniet',
  createdAt: '2022-12-05T19:02:36.000Z',
  updatedAt: '2022-12-06T13:04:20.000Z',
  User: {
    id: 2,
    account: 'user1',
    name: 'user1',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    introduction: 'minus hic enim',
    role: 'user',
    front_cover: 'https://picsum.photos/400/300?random=1'
  },
  Replies: [
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 156
    }
  ],
  Likes: [],
  replyCount: 4,
  likeCount: 0,
  isLiked: false
}
const dummyReplies = [
  {
    id: 156,
    comment: '我是一號君的留言小小一號君',
    createdAt: '2022-12-07T04:00:52.000Z',
    updatedAt: '2022-12-07T04:00:52.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
  },
  {
    id: 7,
    comment:
      'Voluptatem officiis quia. Non veniam quisquam necessitatibus dignissimos et et est. Maiores unde mol',
    createdAt: '2022-12-06T13:02:59.000Z',
    updatedAt: '2022-12-06T13:04:20.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    }
  },
  {
    id: 6,
    comment: 'Vel totam vero.',
    createdAt: '2022-12-05T19:07:58.000Z',
    updatedAt: '2022-12-06T13:04:20.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
  },
  {
    id: 8,
    comment:
      'Voluptas nemo sint dolores in modi tempore.\nSit iure quia delectus unde.\nQuasi ut quod accusamus ape',
    createdAt: '2022-12-05T17:49:29.000Z',
    updatedAt: '2022-12-06T13:04:20.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    }
  }
]

export default new Vuex.Store({
  state() {
    return {
      isReplyModalOpen: false,
      currentUser: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: false
      },
      tweet: {
        id: -1,
        UserId: -1,
        description: '',
        createdAt: '',
        updatedAt: '',
        User: {},
        Replies: [],
        Likes: [],
        replyCount: -1,
        likeCount: -1,
        isLiked: false
      }
    }
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 利用取得的資料覆蓋 state 中的 currentUser
        ...currentUser
      }
    },
    openReplyModal(state) {
      state.isReplyModalOpen = true
    },
    closeReplyModal(state) {
      state.isReplyModalOpen = false
    },
    getTweet(state, tweet) {
      state.tweet = {
        ...state.tweet,
        ...tweet
      }
    },
    addLike(state) {
      // TODO: 改變 tweets
      state.tweet = {
        ...state.tweet,
        likeCount: state.tweet.likeCount + 1,
        isLiked: true
      }
    },
    removeLike(state) {
      // TODO: 改變 tweets
      state.tweet = {
        ...state.tweet,
        likeCount: state.tweet.likeCount - 1,
        isLiked: false
      }
    }
  },
  actions: {
    fetchCurrentUser({ commit }) {
      const { id, name, email, image, isAdmin } = dummyUser

      commit('setCurrentUser', {
        id,
        name,
        email,
        image,
        isAdmin
      })
    },
    fetchTweet({ commit }, tweetId) {
      console.log(`API /tweets/${tweetId}`)
      console.log(`API /tweets/${tweetId}/replies`)
      // TODO: API /tweets/:id
      // TODO: API /tweets/:id/replies
      const {
        id,
        UserId,
        description,
        createdAt,
        updatedAt,
        User,
        Likes,
        replyCount,
        likeCount,
        isLiked
      } = dummyTweet
      const Replies = [...dummyReplies]
      commit('getTweet', {
        id,
        UserId,
        description,
        createdAt,
        updatedAt,
        User,
        Likes,
        replyCount,
        likeCount,
        isLiked,
        Replies
      })
    },
    fetchAddLike({ commit }, tweetId) {
      // TODO: API POST /api/tweets/:id/like
      console.log('fetchAddLike', tweetId)
      commit('addLike', tweetId)
    },
    fetchRemoveLike({ commit }, tweetId) {
      // TODO: API POST /api/tweets/:id/like
      console.log('fetchRemoveLike', tweetId)
      commit('removeLike', tweetId)
    }
  },
  modules: {}
})
