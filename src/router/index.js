import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    // TODO: 修改根路徑為登入頁面
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/user/:id/follower',
    name: 'user-follower',
    component: () => import('../views/UserFollower.vue')
  },
  {
    path: '/user/:id/following',
    name: 'user-following',
    component: () => import('../views/UserFollowing.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue'),
    redirect: (to) => {
      return { name: 'user-tweets', params: { id: to.params.id } }
    },
    children: [
      {
        path: 'tweets',
        name: 'user-tweets',
        component: () => import('../components/UserTweets.vue')
      },

      {
        path: 'replies',
        name: 'user-replies',
        component: () => import('../components/UserReplies.vue')
      },

      {
        path: 'likes',
        name: 'user-likes',
        component: () => import('../components/UserLikes.vue')
      }
    ]
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: () => import('../views/AdminSignIn.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['sign-up', 'sign-in']

  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/')
    return
  }

  next()
})

export default router
