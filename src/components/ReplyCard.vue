<template>
  <div class="reply-card">
    <div class="avatar">
      <img v-if="reply.User.avatar" :src="reply.User.avatar" alt="" />
      <img v-else src="~@/assets/image/tweet-default.png" alt="" />
    </div>
    <div class="card-info">
      <div class="title">
        <h6 class="reply-author">
          {{ reply.User.name }}
          <span>@{{ reply.User.account }}・{{ createdFromNow }}</span>
        </h6>
        <p class="reqly-target">
          回覆 <span>@{{ tweetAccount }}</span>
        </p>
      </div>
      <p class="description">
        {{ reply.comment }}
      </p>
    </div>
  </div>
</template>

<script>
import { dayjs } from '@/utils/helpers'
export default {
  props: {
    reply: {
      type: Object,
      require: true
    },
    tweetAccount: {
      type: String,
      require: true
    }
  },
  computed: {
    createdFromNow() {
      return dayjs(this.reply.createdAt).fromNow()
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-card {
  padding: 16px 23px;
  border-bottom: 1px solid $light-blue2;
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
