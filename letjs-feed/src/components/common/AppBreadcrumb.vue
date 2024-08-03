<template>
  <section class="content-header">
    <ol class="breadcrumb">
      <li
        v-for="(item, key) in breadcrumbs"
        :key="key"
        :class="{ active: key + 1 === breadcrumbs.length }"
      >
        <!-- <a v-if="item.link" :href="item.link">{{item.text}}</a> -->
        <router-link v-if="item.link" :to="item.link">{{
          item.text
        }}</router-link>
        <span v-else>{{ item.text }}</span>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
  .content-header {
    .breadcrumb {
      background-color: transparent;
    }
  }
</style>

<script>
  export default {
    name: 'app-breadcrumb',

    computed: {
      breadcrumbs() {
        let breadcrumbs = this.$route.meta.breadcrumbs

        if (breadcrumbs) {
          breadcrumbs = breadcrumbs.map((bc) => {
            if (typeof bc === 'string') {
              return {
                text: bc
              }
            }
            return bc
          })
        }

        return breadcrumbs || this.getInitialBreadcrumbs()
      },

      dev() {
        let global = this.$store.state.global || {}
        return global.env !== 'online'
      },

      serverIP() {
        let global = this.$store.state.global || {}
        return global.serverIP || 'LOCAL'
      }
    },

    methods: {
      getInitialBreadcrumbs() {
        return []
      }
    }
  }
</script>
