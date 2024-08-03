<template>
  <div class="feed-wrapper">
    <div class="feed-container" v-for="(feed, idx) in feedList" :key="idx">
      <FeedBlock :feature="feedFeature" :feed="feed" :data-index="idx">This is feed homepage</FeedBlock>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/styles/feed.scss';
  .feed-container {
    background: rgb(248, 82, 82)
  }
</style>
<script>
import FeedBlock from '@/pages/components/FeedBlock.vue'
import {
  useFeedStore
} from '@/stores/feedStore'
export default {
  components: {
    FeedBlock
  },
  data: () => {
    return {
      feedFeature: {
        controlText: {
          reply: 'reply',
          comment: 'comment',
          like: 'like'
        }
      },
      feedList: []
    }
  },
  async created () {
    this.feedList = useFeedStore().getHotFeedList()
  }
}
</script>
