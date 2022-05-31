<template>
  <!-- 顶部导航 start-->
  <div class="itemMusicTop">
    <!-- 背景 start-->
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <!-- 背景 end-->
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-jiantou_xiangzuo"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo1-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-category-copy"></use>
      </svg>
    </div>
  </div>
  <!-- 顶部导航 end-->
  <div class="infoMusic">
    <div class="imgMusicList">
      <img :src="playlist.coverImgUrl" alt="" class="imgMusic" />
      <span class="playCount" v-if="playlist?.playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play"></use>
        </svg>
        <span class="count">{{
          (playlist.playCount / 10000).toFixed(1) + "万"
        }}</span>
      </span>
    </div>
    <div class="introduction">
      <span class="name">{{ playlist.name }}</span>
      <!-- 对于数据的creator属性有不存在的情况，所以添加一个条件渲染 -->
      <div class="creator">
        <img
          :src="playlist.creator.avatarUrl"
          alt=""
          class="imgCreator"
          v-if="playlist?.creator"
        />
        <span class="nickname" v-if="playlist?.creator"
          >{{ playlist.creator.nickname }}
        </span>
        <svg class="icon" aria-hidden="true" v-if="playlist?.creator">
          <use xlink:href="#icon-dayuhao1"></use>
        </svg>
      </div>
      <div class="description">{{ playlist.description }}</div>
      <svg class="icon" aria-hidden="true" v-if="playlist?.description">
        <use xlink:href="#icon-dayuhao1"></use>
      </svg>
    </div>
  </div>
  <div class="option">
    <div class="items">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun1"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="items">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang1"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="items">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazaidaoru"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="items">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>分享</span>
    </div>
  </div>
</template>
<script>
export default {
  setup(props) {
    // console.log(props);
    // 通过props进行传值，判断如果数据拿不到就获取sessionStorage的数据
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
  },
  props: ["playlist"],
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  position: relative;
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bgimg {
    width: 100%;
    height: 12rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.5rem);
  }
  .itemLeft,
  .itemRight {
    margin: 0 0.2rem;
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 0.4rem;
      color: white;
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
.infoMusic {
  width: 100%;
  height: 3rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  .imgMusicList {
    position: relative;
    float: left;
    width: 40%;
    height: 100%;
    .imgMusic {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
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
  .introduction {
    float: right;
    width: 55%;
    color: white;
    .name {
      font-weight: 500;
      font-size: 0.4rem;
    }
    .creator {
      margin: 0.2rem 0;
      align-content: center;
      .imgCreator {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      .nickname {
        font-size: 0.3rem;
        color: rgb(238, 235, 235);
      }
      .icon {
        fill: white;
        width: 0.5rem;
        height: 0.5rem;
        padding-top: 0.25rem;
      }
    }
    .description {
      display: inline-block;
      width: 80%;
      font-size: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgb(238, 235, 235);
    }
    .icon {
      fill: white;
      width: 0.5rem;
      height: 0.5rem;
      padding-top: 0.25rem;
    }
  }
}
.option {
  width: 100%;
  height: 1.5rem;
  margin-top: 0.3rem;
  align-content: center;
  .items {
    display: inline-block;
    width: 25%;
    justify-items: center;
    color: white;
    .icon {
      display: block;
      width: 100%;
      fill: white;
      height: 0.8rem;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>