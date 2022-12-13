<template>
  <div class="edit-container">
    <div class="row">
      <nav-tabs class="col-3" />
      <section class="col-6">
        <div class="edit">
          <div class="title">
            <h4>帳戶設定</h4>
          </div>
          <user-form />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavTabs from '@/components/NavTabs.vue'
import UserForm from '@/components/UserForm.vue'

export default {
  components: {
    NavTabs,
    UserForm
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.edit {
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  border-right: 1px solid $light-blue2;
  border-left: 1px solid $light-blue2;
  &::-webkit-scrollbar {
    width: 0;
  }
  .title {
    padding: 24px;
    border-bottom: 1px solid $light-blue2;
    color: $black;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
  }
  form {
    margin: 20px auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
