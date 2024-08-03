<template>
  <el-container style="height: 100%">
    <el-main>
      <app-header class="header">
        <div class="logo-container">
          <router-link :to="'/'"
            ><img style="height: 40px" src="../../assets/logo.png"
          /></router-link>
        </div>
      </app-header>
      <app-nav></app-nav>
      <router-view></router-view>
      <app-footer class="footer">I am a naughty footer</app-footer>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
  * {
    font-family: arial, sans-serif;
  }
  .el-main {
    --el-main-padding: 0px;
  }
  .header {
    height: 64px;
    // padding-left: 0.8rem;
    display: flex;
    // border-bottom: solid rgba(60, 60, 67, 0.12) 1px;
  }
  .logo-container {
    height: 100%;
    line-height: 100%;
    display: flex;
    align-items: center;
    a {
      height: 40px;
    }
  }
  .footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 1rem;
    bottom: 0;
  }
</style>
