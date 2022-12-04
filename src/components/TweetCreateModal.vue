<template>
  <div class="modal-background">
    <div class="modal-card">
      <div class="card-header">
        <button class="close-btn" @click="clickCloseBtn">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M13.4141 11.9999L19.2071 6.20687C19.5971 5.81687 19.5971 5.18388 19.2071 4.79288C18.8171 4.40188 18.1841 4.40288 17.7931 4.79288L12.0001 10.5859L6.20712 4.79288C5.81712 4.40288 5.18412 4.40288 4.79312 4.79288C4.40212 5.18288 4.40312 5.81587 4.79312 6.20687L10.5861 11.9999L4.79312 17.7929C4.40312 18.1829 4.40312 18.8159 4.79312 19.2069C4.98812 19.4019 5.24312 19.4999 5.50012 19.4999C5.75712 19.4999 6.01212 19.4019 6.20712 19.2069L12.0001 13.4139L17.7931 19.2069C17.9881 19.4019 18.2431 19.4999 18.5001 19.4999C18.7571 19.4999 19.0121 19.4019 19.2071 19.2069C19.5971 18.8169 19.5971 18.1839 19.2071 17.7929L13.4141 11.9999Z"
            />
          </svg>
        </button>
      </div>
      <tweet-create-card @afterCreateTweet="afterCreateTweet" />
    </div>
  </div>
</template>

<script>
import TweetCreateCard from './TweetCreateCard.vue'

export default {
  components: {
    TweetCreateCard
  },
  methods: {
    clickCloseBtn() {
      this.$emit('clickCloseBtn')
    },
    afterCreateTweet(newTweet) {
      this.$emit('afterCreateTweet', newTweet)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-background {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modal-card {
  width: 36%;
  border-radius: 14px;
  background-color: #fff;
  position: absolute;
  top: 56px;
  right: 32%;
  overflow: hidden;
}
.card-header {
  height: 56px;
  padding: 16px 15px;
  border-bottom: 1px solid $light-blue2;
  button {
    border: 0;
    background-color: #fff;
    cursor: pointer;
  }
  svg {
    width: 24px;
    height: 24px;
    fill: $brand-color;
  }
}
</style>
