<template>
  <footer class="main-footer">
    <div class="container">
      <div class="footer-content">
        <p class="text-center">
          Copyright &copy; {{ appYear }}
          <a href="//let-js.github.io">let-js.github.io</a> All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .main-footer {
    height: 40px;
    line-height: 40px;
    border-radius: 15px;
    margin-top: 20px;
    .container {
      border-radius: 15px 15px 0 0;
      width: 1280px;
      margin: auto;
      background-color: #e5e9ef;
    }
  }
</style>

<script>
  export default {
    name: 'app-footer',
    data() {
      return {
        appYear: new Date().getFullYear()
      }
    }
  }
</script>
