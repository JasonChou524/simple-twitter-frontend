<template>
  <div class="wrap">
    <div class="popular-list">
      <div class="title">
        <h4>推薦追隨</h4>
      </div>
      <div class="user-card">
        <div class="profile">
          <div class="avatar">
            <img src="~@/assets/image/tweet-default.png" alt="" />
          </div>
          <div class="info">
            <h6>Pizza Hut</h6>
            <p>@pizzahut</p>
          </div>
        </div>
        <button class="unfollow-btn">正在追隨</button>
      </div>
      <div class="user-card">
        <div class="profile">
          <div class="avatar">
            <img src="~@/assets/image/tweet-default.png" alt="" />
          </div>
          <div class="info">
            <h6>Pizza Hut</h6>
            <p>@pizzahut</p>
          </div>
        </div>
        <button class="unfollow-btn">正在追隨</button>
      </div>
      <div class="user-card">
        <div class="profile">
          <div class="avatar">
            <img src="~@/assets/image/tweet-default.png" alt="" />
          </div>
          <div class="info">
            <h6>Pizza Hut</h6>
            <p>@pizzahut</p>
          </div>
        </div>
        <button class="follow-btn">追隨</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
      width: 100%;
      vertical-align: middle;
    }
  }
  h6 {
    font-size: 16px;
    font-weight: 700;
    color: $black;
    margin-bottom: 3px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    color: $gray2;
  }
}
</style>
