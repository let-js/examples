<template>
  <div class="feed-wrapper">
    <h1 style="text-align: center">欢迎来到<a href="https://github.com/let-js">Let-js</a>，这是一个JS版的简单例子。</h1>
    <div class="feed-container" v-for="(feed, idx) in feedList" :key="idx">
      <feed-block :feature="feedFeature" :feed="feed" :data-index="idx"
        >这是一个简单的例子</feed-block
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../styles/feed.scss';
</style>
<script>
  import FeedBlock from './components/FeedBlock.vue'
  import { getFeeds } from '@/composition/feed'
  export default {
    components: {
      FeedBlock
    },
    data: () => {
      return {
        feedFeature: {
          controlText: {
            reply: '转发',
            comment: '评论',
            like: '点赞'
          }
        },
        feedList: []
      }
    },
    created() {
      // 演示直接通过service获取数据
      this.initFeedList()
    },
    methods: {
      async initFeedList() {
        let feedList = await getFeeds()
        this.feedList = feedList
      }
    }
  }
</script>
