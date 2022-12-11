import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get('/users/currentUser', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUser({ id }) {
    return apiHelper.get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserTweets({ id }) {
    return apiHelper.get(`/users/${id}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLikes({ id }) {
    return apiHelper.get(`/users/${id}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserReplies({ id }) {
    return apiHelper.get(`/users/${id}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
