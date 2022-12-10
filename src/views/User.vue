<template>
  <div class="user-container">
    <div class="row">
      <nav-tabs class="col-3" />
      <section class="col-6">
        <div class="user">
          <nav class="header">
            <a href="">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M20 10.9999H7.41399L11.707 6.70687C12.097 6.31687 12.097 5.68388 11.707 5.29288C11.317 4.90188 10.684 4.90288 10.293 5.29288L4.29299 11.2929C3.90299 11.6829 3.90299 12.3159 4.29299 12.7069L10.293 18.7069C10.488 18.9019 10.743 18.9999 11 18.9999C11.257 18.9999 11.512 18.9019 11.707 18.7069C12.097 18.3169 12.097 17.6839 11.707 17.2929L7.41399 12.9999H20C20.553 12.9999 21 12.5529 21 11.9999C21 11.4469 20.553 10.9999 20 10.9999Z"
                />
              </svg>
            </a>
            <div class="title">
              <h6>John Doe</h6>
              <p>25 推文</p>
            </div>
          </nav>
          <div class="img-wrap">
            <img
              class="front-cover"
              src="~@/assets/image/front-cover.png"
              alt=""
            />
            <div class="avatar">
              <img src="~@/assets/image/tweet-default.png" alt="" />
            </div>
          </div>
          <div class="user-card">
            <div class="card-header">
              <button>編輯個人資料</button>
            </div>
            <div class="card-body">
              <h6>John Doe</h6>
              <p class="account">@heyjohn</p>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint.
              </p>
              <div class="follow-info">
                <a href="">34 個<span>跟隨中</span></a>
                <a href="">59 位<span>跟隨者</span></a>
              </div>
            </div>
          </div>
          <nav class="navtabs">
            <ul>
              <li class="active"><a href="">推文</a></li>
              <li><a href="">回覆</a></li>
              <li><a href="">喜歡的內容</a></li>
            </ul>
          </nav>
        </div>
      </section>
      <user-popular class="col-3" />
    </div>
  </div>
</template>

<script>
import NavTabs from '@/components/NavTabs.vue'
import UserPopular from '@/components/UserPopular.vue'

export default {
  components: {
    NavTabs,
    UserPopular
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.user {
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  border-right: 1px solid $light-blue2;
  border-left: 1px solid $light-blue2;
  &::-webkit-scrollbar {
    width: 0;
  }
  h6 {
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    color: $black;
  }
  nav.header {
    height: 74px;
    padding: 24px;
    border-bottom: 1px solid $light-blue2;
    display: flex;
    align-items: center;
    backdrop-filter: blur(3px);
    font-weight: 700;
    position: sticky;
    top: 0;
    svg {
      width: 24px;
      height: 24px;
    }
    .title {
      margin-left: 16px;
      p {
        font-size: 13px;
        font-weight: 500;
        line-height: 19px;
        color: $Secondary;
      }
    }
  }
  .img-wrap {
    width: 100%;
    position: relative;
    .front-cover {
      width: 100%;
      height: 200px;
    }
    .avatar {
      width: 140px;
      height: 140px;
      border: 3px solid #fff;
      border-radius: 100px;
      position: absolute;
      bottom: -70px;
      left: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .card-header {
    padding: 16px;
    display: flex;
    flex-direction: row-reverse;
    button {
      padding: 8px 16px;
      border: 1px solid $brand-color;
      border-radius: 50px;
      background-color: #fff;
      color: $brand-color;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .card-body {
    padding: 0 16px;
    p,
    a {
      margin-bottom: 6px;
      color: $black;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      &.account {
        margin-bottom: 8px;
        color: $Secondary;
      }
    }
    .follow-info {
      display: flex;
      a {
        margin-right: 20px;
      }
      span {
        color: $Secondary;
      }
    }
  }
  .navtabs {
    a {
      color: $gray4;
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
    }
    ul {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $light-blue2;
    }
    li {
      width: 130px;
      padding: 15px 0;
      text-align: center;
      &.active {
        a {
          color: $brand-color;
        }
        border-bottom: 2px solid $brand-color;
      }
    }
  }
}
</style>
