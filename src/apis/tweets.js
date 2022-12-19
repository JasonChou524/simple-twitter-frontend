import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweet({ id }) {
    return apiHelper.get(`/tweets/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  createTweet({ description }) {
    return apiHelper.post(
      '/tweets',
      { description },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    )
  },
  addLike({ id }) {
    return apiHelper.post(
      `/tweets/${id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    )
  },
  removeLike({ id }) {
    return apiHelper.post(
      `/tweets/${id}/unlike`,
      {},
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    )
  },
  getReplies({ id }) {
    return apiHelper.get(`/tweets/${id}/replies`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  createReply({ id, comment }) {
    return apiHelper.post(
      `/tweets/${id}/replies`,
      { comment },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    )
  }
}
