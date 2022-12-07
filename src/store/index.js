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
    }
  },
  modules: {}
})
