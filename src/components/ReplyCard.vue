<template>
  <div class="reply-card">
    <div class="avatar">
      <img src="~@/assets/image/tweet-default.png" alt="" />
    </div>
    <div class="card-info">
      <div class="title">
        <h6 class="reply-author">
          Devon Lane <span>@devon_lane・12 小時</span>
        </h6>
        <p class="reqly-target">回覆 <span>@apple</span></p>
      </div>
      <p class="description">
        former apple engineer shares a simple DIY fix to seal your surgical mask
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.reply-card {
  padding: 16px 23px;
  border: 1px solid $light-blue2;
  border-top: 0;
  display: flex;
}
.avatar {
  margin-right: 8px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
}
.title {
  margin-bottom: 8px;
  h6 {
    margin-bottom: 8px;
    color: $black;
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    span {
      color: $Secondary;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
  }
  p {
    color: $Secondary;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    span {
      color: $brand-color;
    }
  }
}
p.description {
  color: $black;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}
</style>
