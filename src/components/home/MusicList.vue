<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">推荐歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="130"
        class="swipeList"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in musicList" :key="item">
          <router-link :to="{ path: '/ItemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-play"></use>
              </svg>
              <span class="count">{{
                (item.playCount / 10000).toFixed(1) + "万"
              }}</span>
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getData } from "../../../request/api/home.js";
export default {
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getList() {
      let res = await getData("/personalized?limit=10");
      // console.log(res);
      this.musicList = res.data.result;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.musicList {
  border-top: 1px solid #ccc;
  width: 100%;
  height: 6rem;
  padding: 0.2rem;
  position: relative;
  .musicTop {
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.5rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    position: relative;
    width: 100%;
    height: 4rem;
    .swipeList {
      height: 100%;
      img {
        width: 100%;
        height: 65%;
        padding: 0 0.1rem;
        border-radius: 0.4rem;
      }
      .playCount {
        position: absolute;
        height: 0.5rem;
        top: 0;
        right: 0.2rem;
        font-size: 0.2rem;
        color: white;

        .icon {
          font-size: 0.2rem;
          vertical-align: middle;
        }
        .count {
          text-align: center;
          line-height: 0.5rem;
        }
      }
    }
  }
}
</style>