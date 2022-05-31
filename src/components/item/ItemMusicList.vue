<template>
  <div class="musicList">
    <div class="musicListHead">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span class="playAll"
          >播放全部
          <span class="count" v-if="itemlist?.length"
            >(共{{ itemlist.length }}首)
          </span></span
        >
      </div>
      <div class="right">
        <span>+收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="musicListBody">
      <div class="item" v-for="(item, i) in itemlist" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <div class="index">
            {{ i + 1 }}
          </div>
          <div class="infoSong">
            <div class="name">
              {{ item.name }}
            </div>
            <span class="singer" v-for="(n, index) in item.ar" :key="index">
              {{ n.name }} &nbsp;
            </span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo-shuxiang"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="musicListFooter">
      <p>- 已滑至歌单底部 -</p>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {
    console.log(props);
  },
  props: ["itemlist", "subscribedCount"],
  methods: {
    playMusic: function (i) {
      this.updatePlayList(this.itemlist);
      this.updatePlayListIndex(i);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .musicListHead {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.1rem;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
      }
      .playAll {
        margin-left: 0.2rem;
        font-weight: 700;
        font-size: larger;
        .count {
          text-align: center;

          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
    }
  }
  .musicListBody {
    width: 100%;
    background-color: #fff;
    // .item::before {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   content: "";
    //   display: none;
    //   width: 100%;
    //   height: 1.4rem;
    //   background-color: rgba(171, 170, 170, 0.189);
    // }
    // .item:hover::before {
    //   display: block;
    // }
    .item {
      width: 100%;
      height: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .itemLeft {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .index {
          margin-left: 0.2rem;
          width: 0.2rem;
          color: rgb(94, 93, 93);
          font-size: larger;
        }
        .infoSong {
          margin-left: 0.4rem;
          .name {
            width: 4.54rem;
            height: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: larger;
          }
          .singer {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
    }
  }
  .musicListFooter {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
  }
}
</style>
