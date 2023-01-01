<template>
  <div class="spinner">
    <div class="bouncing-loader">
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style scoped lang="scss">
.spinner {
  padding-top: 100px;
}

.bouncing-loader {
  display: flex;
  justify-content: center;
  > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: #ff6600;
    border-radius: 50%;
    animation: loader 0.6s infinite alternate;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes loader {
  from {
    transform: scale(0.3);
  }
  to {
    transform: scale(1.1);
  }
}
</style>
