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
    }
  ],
  Likes: [],
  replyCount: 3,
  likeCount: 0,
  isLiked: false
}

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
    setTweet(state, tweet) {
      state.tweet = {
        ...state.tweet,
        // 利用取得的資料覆蓋 state 中的 tweet
        ...tweet
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
    getTweet({ commit }, tweetId) {
      // TODO: API GET tweets/:id
      console.log(tweetId)
      const {
        id,
        UserId,
        description,
        createdAt,
        updatedAt,
        User,
        Replies,
        Likes,
        replyCount,
        likeCount,
        isLiked
      } = dummyTweet

      commit('setTweet', {
        id,
        UserId,
        description,
        createdAt,
        updatedAt,
        User,
        Replies,
        Likes,
        replyCount,
        likeCount,
        isLiked
      })
    }
  },
  modules: {}
})
