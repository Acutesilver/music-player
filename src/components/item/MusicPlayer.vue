<template>
  <div class="music-player">
    <div class="player-left" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="song-info">
        <div class="name">{{ playList[playListIndex].name }}</div>
      </div>
    </div>
    <div class="player-right">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isPause">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlist2"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
  </div>
  <div class="pop">
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <DetailMusic
        :musicList="playList[playListIndex]"
        :play="play"
        :isPause="isPause"
        :getDuration="getDuration"
      />
    </van-popup>
  </div>
</template>
<script>
import DetailMusic from "./DetailMusic.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return { interval: 0 };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isPause", "detailShow"]),
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.getDuration();
  },
  methods: {
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updatePlay(false);
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updatePlay(true);
        clearInterval(this.interval);
      }
    },
    ...mapMutations([
      "updatePlay",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
    getDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime: function () {
      this.interval = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
  },
  watch: {
    playListIndex: function () {
      this.$refs.audio.autoplay = true;
      this.updatePlay(false);
    },
    playList: function () {
      if (this.isPause) {
        this.$refs.audio.autoplay = true;
        this.updatePlay(false);
      }
    },
  },
  components: { DetailMusic },
};
</script>
<style lang="less" scoped>
.pop {
  position: absolute;
  top: -50rem;
}
.music-player {
  width: 100%;
  height: 1.5rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .player-left {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 0.7rem;
      border: 0.2rem solid black;
    }
    .song-info {
      flex: 60%;
      margin-left: 0.2rem;
      .name {
        width: 3rem;
        font-size: larger;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .player-right {
    flex: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    fill: black;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>