<template>
  <div class="feed-block">
    <div class="feed-img">
      <a :href="feed.link"  @click="imgSrc"><img :src="feed.imgSrc" /></a>
    </div>
    <div class="feed-text">
      <dl>
        <dt class="feed-title">
          <a :href="feed.link" @click="title">{{ feed.title }}</a>
        </dt>
        <dd class="feed-desc">
          <a :href="feed.link" @click="desc">{{ feed.desc }}</a>
        </dd>
      </dl>
      <div class="feed-address">
        <span class="feed-poster">
          <router-link
            :to="{
              name: 'user',
              params: { uid: feed.posterId }
            }"
            >{{ feed.poster }}</router-link
          >
          <!-- <a :href="'/user/' + feed.posterId">{{ feed.poster }}</a> -->
        </span>
        |
        <span class="feed-date">{{ feed.publishDate }}</span>
        <ul class="feed-control">
          <li class="feed-reply" @click="reply">
            <a href="#">{{ feature.controlText.reply }}</a
            >({{ feed.replyCount }})
          </li>
          <li class="feed-comment" @click="comment">
            <a href="#">{{ feature.controlText.comment }}</a
            >({{ feed.commentCount }})
          </li>
          <li class="feed-like" @click="like">
            <a href="#">{{ feature.controlText.like }}</a
            >({{ feed.likeCount }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .feed-block {
    padding: 15px;
    height: 200px;

    .feed-img {
      max-width: 240px;
      max-height: 180px;
      float: left;
      overflow: hidden;
    }
    .feed-img img {
      text-align: center;
      border-style: none;
      margin: 0 auto;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      display: table-cell;
      margin: 10px 0 0 10px;
      // border-radius: 10px;
      /* filter: blur(5px); */
      // mask-image: linear-gradient(
      //   to bottom,
      //   rgba(0, 0, 0, 1) 0%,
      //   rgba(0, 0, 0, 0) 100%
      // );
    }

    .feed-text {
      a {
        text-decoration: none;
      }
      dl {
        height: 136px;
      }
      dl a {
        color: #333;
      }
      float: left;
      max-width: 920px;
      margin-left: 20px;
      .feed-title {
        font-size: 2em;
      }
      .feed-desc {
        margin-top: 10px;
        margin-left: 0;
        line-height: 24px;
        height: 100px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
    }

    .feed-title {
      font-size: 1.2em;
    }

    .feed-control {
      float: right;
      margin-top: -5px;
      li {
        float: left;
        list-style-type: none;
        margin: 5px;
      }
    }
  }
</style>

<script>
  export default {
    name: 'FeedBlock',

    props: {
      feature: Object,
      feed: Object
    },

    data() {
      return {}
    },

    computed: {},

    methods: {
      imgSrc() {
        alert('imgSrc:' + this.feed.imgSrc)
        return
      },

      title() {
        alert('title:' + this.feed.title)
        return
      },

      desc() {
        alert('desc:' + this.feed.desc)
        return
      },

      reply() {
        alert('reply:' + this.feed.title + arguments)
      },

      comment() {
        alert('comment:' + this.feed.desc + arguments)
      },

      like() {
        alert('like:' + this.feed.title + arguments)
      }
    },

    created() {}
  }
</script>
