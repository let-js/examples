<template>
  <div class="text-center">
    <slot><h1></h1></slot>
  </div>
</template>

<style lang="scss" scoped>
  .main-nav {
    float: left;
    width: 240px;
    padding: 10px;
    background-color: #e6e9ef;
    border-radius: 15px;
    text-align: center;
    min-height: 300px;
    margin: 0;
  }
  .q-button.is-round {
    width: 80%;
    border-radius: 5px;
    margin: 5px 0 5px 0;
  }
</style>
<script>
  export default {
    name: 'app-nav',
    components: {},
    computed: {
      nav() {
        // get nav config from global store
        return this.$store.state.global.nav || []
      },
      user() {
        // get user info from global store
        return this.$store.state.global.user || {}
      }
    },

    data() {
      return {
        appName: 'let-js'
      }
    }
  }
</script>
