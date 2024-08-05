<template>
  <div class="feed-wrapper">
    <div class="feed-container" v-for="(feed, idx) in feedList" :key="idx">
      <feed-block :feature="feedFeature" :feed="feed" :data-index="idx"
        >This is feed homepage</feed-block
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/styles/feed.scss';
  .feed-container {
    background: rgba(49, 238, 188, 0.771)
  }
</style>
<script>
  import FeedBlock from '../components/FeedBlock.vue'
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
        console.log('feed/Index.vue>data:[feedList:[]]', this.feedList)
      }
    }
  }
</script>
