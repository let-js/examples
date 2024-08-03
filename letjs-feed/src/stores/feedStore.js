import {
  Feed
} from '../domain/Feed'
import {
  defineStore
} from 'pinia'
export const useFeedStore = defineStore('feed', {
  state: () => ({
    feed: new Feed(),
  }),
  getters: {},
  actions: {
    updateFeed(feed) {
      this.feed = feed
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