import Vue from 'vue'
import Vuex from 'vuex'

import usersAPI from '@/apis/users'
import tweetsAPI from '@/apis/tweets'
import { Toast } from '@/utils/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      isReplyModalOpen: false,
      currentUser: {
        id: -1,
        account: '',
        name: '',
        email: '',
        avatar: '',
        role: ''
      },
      isAuthenticated: false,
      token: '',
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
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
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
    createReply(state, newReply) {
      state.tweet.Replies.unshift(newReply)
      state.tweet.replyCount = state.tweet.replyCount + 1
    },
    addLike(state) {
      state.tweet = {
        ...state.tweet,
        likeCount: state.tweet.likeCount + 1,
        isLiked: true
      }
    },
    removeLike(state) {
      state.tweet = {
        ...state.tweet,
        likeCount: state.tweet.likeCount - 1,
        isLiked: false
      }
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, account, name, email, avatar, role } = data.user
        commit('setCurrentUser', { id, account, name, email, avatar, role })
        return true
      } catch (error) {
        commit('revokeAuthentication')
        return false
      }
    },
    async fetchTweet({ commit }, tweetId) {
      try {
        const tweetResponse = await tweetsAPI.getTweet({ id: tweetId })
        const repliesResponse = await tweetsAPI.getReplies({ id: tweetId })
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
        } = tweetResponse.data
        const Replies = [...repliesResponse.data]
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
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資訊，請稍候再試'
        })
      }
    },
    async fetchAddLike({ commit }, tweetId) {
      try {
        const { data } = await tweetsAPI.addLike({ id: tweetId })

        if (data.status === 'error') {
          throw new Error(data)
        }

        Toast.fire({
          icon: 'success',
          title: '喜歡推文成功'
        })
        commit('addLike', tweetId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法喜歡推文，請稍候再試'
        })
      }
    },
    async fetchRemoveLike({ commit }, tweetId) {
      try {
        const { data } = await tweetsAPI.removeLike({ id: tweetId })

        if (data.status === 'error') {
          throw new Error(data)
        }

        Toast.fire({
          icon: 'success',
          title: '移除喜歡推文成功'
        })

        commit('removeLike', tweetId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法移除喜歡推文，請稍候再試'
        })
      }
    }
  },
  modules: {}
})
