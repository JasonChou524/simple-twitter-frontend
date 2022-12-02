<template>
  <div class="main-container">
    <div class="row">
      <nav-tabs class="col-3" />
      <div class="main col-6">
        <div class="title">
          <h4>首頁</h4>
        </div>
        <div class="create-tweet-card">
          <div class="card-body">
            <a class="avatar">
              <img src="~@/assets/image/tweet-default.png" alt="" />
            </a>
            <textarea class="text" name="" id="" placeholder="有什麼新鮮事？">
            </textarea>
          </div>
          <div class="card-footer">
            <button>推文</button>
            <span>10/140</span>
            <span>推文不得超過 140 字</span>
          </div>
        </div>
        <tweet-card />
      </div>
      <user-popular class="col-3" />
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserPopular from '../components/UserPopular.vue'
import TweetCard from '../components/TweetCard.vue'

export default {
  name: 'Main',
  components: {
    NavTabs,
    UserPopular,
    TweetCard
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.main {
  position: relative;
  .title {
    height: 74px;
    padding: 24px;
    border-left: 1px solid $light-blue2;
    border-right: 1px solid $light-blue2;
    border-bottom: 1px solid $light-blue2;
    font-weight: 700;
    position: static;
  }
  .create-tweet-card {
    padding: 16px 25px;
    border-left: 1px solid $light-blue2;
    border-right: 1px solid $light-blue2;
    border-bottom: 10px solid $light-blue2;
  }
}
.card-body {
  display: flex;
  .avatar {
    margin-right: 8px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  .text {
    height: 150px;
    width: 100%;
    padding-top: 12px;
    border: 0;
    resize: none;
    font-size: 18px;
    vertical-align: bottom;
    &::placeholder {
      font-size: 18px;
      font-weight: 700;
    }
    &:focus {
      outline: none;
      border: 0;
    }
  }
}
.card-footer {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  button {
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    border: 0;
    background-color: $brand-color;
    color: #fff;
  }
  span {
    margin-right: 10px;
  }
}
</style>
