<template>
  <div class="follow-card">
    <div class="avatar">
      <img v-if="userFollow.avatar" :src="userFollow.avatar" alt="" />
      <img v-else src="~@/assets/image/tweet-default.png" alt="" />
    </div>
    <div class="card-body">
      <div class="title">
        <h6>{{ userFollow.name }}</h6>
        <button v-if="userFollow.isFollow" class="unfollow-btn">
          正在跟隨
        </button>
        <button v-else class="follow-btn">跟隨</button>
      </div>
      <p>
        {{ userFollow.introduction }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userFollow: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-card {
  display: flex;
  padding: 16px 23px;
  border-bottom: 1px solid #e6ecf0;
}
.avatar {
  margin-right: 8px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }
}
.title {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h6 {
    color: $black;
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
  }
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
.card-body {
  flex-grow: 1;
}
p {
  color: $black;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}
</style>
