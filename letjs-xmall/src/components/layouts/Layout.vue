<template>
  <n-layout style="height: 100%">
    <n-layout-header class="header">
      <div style="height: 100%; width: 100%; display: flex">
        <div class="logo">
          <router-link :to="'/'"
            ><img style="height: 50px" src="../../assets/xmall-logo.png"
          /></router-link>
        </div>
        <div class="search-box-container">
          <SearchBox></SearchBox>
        </div>
        <div class="user-bar-container">
          <UserBar></UserBar>
        </div>
      </div>
    </n-layout-header>
    <n-layout-content>
      <router-view> </router-view>
    </n-layout-content>
    <n-layout-footer class="footer">Copyright@xmall Inc. Powered by Letjs.</n-layout-footer>
  </n-layout>
</template>
<style lang="scss">
* {
  font-size: 16px;
}
a {
  color: #444;
  text-decoration: none;
}
a:hover {
  color: #cf3137;
}
.header {
  height: 60px;
  display: flex;
  border-bottom: 2px solid #cf3137;
}
.header .logo {
  display: flex;
  margin-left: 5px;
  margin-top: 5px;
  width: 200px;
}
.search-box-container {
  width: 500px;
  margin: auto;
  align-content: center;
}
.user-bar-container {
  width: 300px;
}
.footer {
  line-height: 40px;
  text-align: center;
  color: #333;
  // border-top: 1px solid #fff;
  background-color: #eee;
  font-size: 1rem;
  bottom: 0;
}
</style>
>
