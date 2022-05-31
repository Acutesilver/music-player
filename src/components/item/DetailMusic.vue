<template>
  <div class="detail">
    <img :src="musicList.al.picUrl" alt="" class="bgimg" />
    <div class="detail-head">
      <div class="detail-head-left">
        <svg class="icon" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="info-song">
          <MarqueeTips
            :content="musicList.name"
            class="song"
            style="width: 3rem"
          ></MarqueeTips>
          <!-- <p class="song">
            {{ musicList.al.name }}
          </p> -->

          <div class="singer" v-if="musicList?.ar">
            <span v-for="item in musicList.ar" :key="item">
              {{ item.name }}
            </span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dayuhao1"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="detail-head-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang_o-copy"></use>
        </svg>
      </div>
    </div>
    <div class="detail-body" v-show="!isLyricShow">
      <img
        src="../../assets/needle.png"
        alt=""
        class="needle"
        :class="{ needle_active: !isPause }"
      />
      <img src="../../assets/disk.png" alt="" class="disk" />
      <img
        :src="musicList.al.picUrl"
        alt=""
        @click="isLyricShow = true"
        class="diskimg"
        :class="{ diskimg_run: !isPause, diskimg_pause: isPause }"
      />
    </div>
    <div class="lyricShow" ref="lyricShow" v-show="isLyricShow">
      <p
        v-for="item in lyricProcess"
        :key="item"
        :class="{
          active:
            item.time <= currentTime * 1000 && currentTime * 1000 <= item.next,
        }"
      >
        {{ item.lyric }}
      </p>
    </div>
    <div class="detail-footer">
      <div class="icontop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07-copy"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun3-copy"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang"></use>
        </svg>
      </div>
      <div class="bar">
        <input
          type="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="play">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-48shangyishou"></use>
        </svg>
        <svg
          class="icon control"
          aria-hidden="true"
          @click="play"
          v-if="isPause"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon control" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-49xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-category-copy"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import MarqueeTips from "vue-marquee-tips";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },

  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playList",
      "playListIndex",
      "duration",
    ]),
    lyricProcess: function () {
      let lyricArr;
      if (this.lyricList.lyric) {
        lyricArr = this.lyricList.lyric
          .split(/[(\r\n)\r\n]+/)
          .map((item, i) => {
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let ms = item.slice(7, 10);
            let lyric = item.slice(11, item.length);
            if (isNaN(Number(ms))) {
              ms = item.slice(7, 9);
              lyric = item.slice(10, item.length);
            }
            let time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(ms);
            // console.log(min, sec, ms, lyric);
            return { min, sec, ms, lyric, time };
          });
        lyricArr.forEach((item, i) => {
          if (i === lyricArr.length - 1 || isNaN(lyricArr[i + 1].time)) {
            item.next = 1000000;
          } else {
            item.next = lyricArr[i + 1].time;
          }
        });
      }
      // console.log(lyricArr);
      return lyricArr;
    },
  },
  mounted() {
    // console.log(this.lyricList.lyric);
    this.getDuration();
  },
  props: ["musicList", "play", "isPause", "getDuration"],
  methods: {
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    goBack: function () {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay: function (offset) {
      let index = this.playListIndex + offset;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
  },
  components: {
    MarqueeTips,
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      // console.log([this.$refs.lyricShow]);
      if (p) {
        if (p.offsetTop > 280) {
          this.$refs.lyricShow.scrollTop = p.offsetTop - 280;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
};
</script>
<style lang="less">
.detail {
  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(1.5rem);
  }
  .detail-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem 0;
    .detail-head-left {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: white;
        margin: 0 0.1rem;
      }
      .info-song {
        .song {
          color: white;
          font-size: larger;
        }
        .singer {
          color: rgb(101, 99, 99);
          span {
            width: 3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          font-size: small;
          .icon {
            width: 0.2rem;
            height: 0.2rem;
            fill: rgb(101, 99, 99);
          }
        }
      }
    }
    .detail-head-right {
      .icon {
        width: 0.7rem;
        height: 0.7rem;
        margin: 0 0.1rem;
      }
    }
  }
  .detail-body {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .needle {
      width: 2rem;
      height: 3.5rem;
      position: absolute;
      left: 47%;
      transform-origin: 0 0;
      transform: rotate(-15deg);
      transition: all 2s;
    }
    .needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 47%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .disk {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }
    .diskimg {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: img_rotate 10s linear infinite;
    }
    .diskimg_run {
      animation-play-state: running;
    }
    .diskimg_pause {
      animation-play-state: paused;
    }
    @keyframes img_rotate {
      0% {
        transform: rotateZ(0);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .lyricShow {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.4rem;
    overflow: scroll;
    p {
      color: rgb(202, 199, 199);
      margin-bottom: 0.4rem;
    }
    .active {
      color: white;
      font-size: larger;
    }
  }
  .detail-footer {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .play,
    .icontop {
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      fill: white;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    .bar {
      input {
        width: 100%;
        height: 0.04rem;
      }
    }
    .play {
      .control {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>