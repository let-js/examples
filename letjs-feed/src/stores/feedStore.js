import {
  Feed
} from '../domain/Feed'
import {
  defineStore
} from 'pinia'
export const useFeedStore = defineStore('feed', {
  state: () => ({
    feed: new Feed(),
    feeds: []
  }),
  getters: {},
  actions: {
    updateFeed(feed) {
      this.feed = feed
    },
    updateFeeds(feeds) {
      this.feeds = feeds
    },
    getFeed() {
      return this.feed
    },
    getHotFeedList() {
      return Array(10).fill(this.feed)
    },
    removeFeed(feed) {
      for (let item in feed) {
        delete feed[item]
      }
    },
  },
})