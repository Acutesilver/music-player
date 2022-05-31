<template>
  <div class="searchHead">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="告白气球"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <div class="record">
      <span class="tip">历史</span>
      <span
        class="key"
        v-for="item in wordsList"
        :key="item"
        @click="searchHistory(item)"
      >
        {{ item }}
      </span>
    </div>
    <svg class="icon del" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-changyonggoupiaorenshanchu"></use>
    </svg>
  </div>
  <div class="musicListBody">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item, i)">
        <div class="index">
          {{ i + 1 }}
        </div>
        <div class="infoSong">
          <div class="name">
            {{ item.name }}
          </div>
          <span class="singer" v-for="(n, index) in item.artists" :key="index">
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
    <div class="musicListFooter">
      <p>- 已滑至歌单底部 -</p>
    </div>
  </div>
</template>
<script>
import { getData } from "../../request/api/home.js";
export default {
  data() {
    return {
      wordsList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.wordsList = JSON.parse(localStorage.getItem("wordsList")) || [];
  },
  methods: {
    enterKey: async function () {
      if (this.searchKey != "") {
        this.wordsList.unshift(this.searchKey);
        this.wordsList = [...new Set(this.wordsList)];
        //new Set转换为去重后的set，...变成参数序列，外加[]包裹成新数组
        if (this.wordsList.length > 5) {
          this.wordsList.splice(this.wordsList.length - 1, 1);
        }
        localStorage.setItem("wordsList", JSON.stringify(this.wordsList));
        let res = await getData(`/search?keywords=${this.searchKey}`);
        // console.log(res);
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    delHistory: function () {
      localStorage.removeItem("wordsList");
      this.wordsList = [];
    },
    searchHistory: async function (item) {
      let res = await getData(`/search?keywords=${item}`);
      //   console.log(res);
      this.searchList = res.data.result.songs;
    },
    updateIndex: function (item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>
<style lang="less" scoped>
.searchHead {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  .icon {
    width: 0.5rem;
    height: 0.5rem;
  }
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .record {
    flex: 90%;
    .tip {
      font-weight: 700;
    }
    .key {
      padding: 0.1rem 0.2rem;
      background-color: rgb(181, 179, 179);
      border-radius: 0.4rem;
      margin: 0.1rem 0.1rem;
      display: inline-block;
    }
  }

  .del {
    fill: rgb(92, 91, 91);
  }
}
.musicListBody {
  width: 100%;
  background-color: #fff;
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
</style>