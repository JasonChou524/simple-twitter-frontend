<template>
  <div class="main-container">
    <div class="row">
      <nav-tabs class="col-3" />
      <div class="middle col-6">
        <h1>Main</h1>
      </div>
      <user-popular class="col-3" />
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserPopular from '../components/UserPopular.vue'

export default {
  name: 'Main',
  components: {
    NavTabs,
    UserPopular
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
</style>
