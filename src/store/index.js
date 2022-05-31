import { getSongLyric } from '../../request/api/item.js';
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{
      al:
      {
        id: 81982777,
        name: "Roadkill",
        pic: 109951164392985180,
        picUrl: "https://p2.music.126.net/QGxVHAoGxLTqJ5QjVAF3bQ==/109951164392985191.jpg",
        pic_str: "109951164392985191"
      },
      id: 1393632138,
      name: "Roadkill",
      ar: [{
        name: "打倒三明治"
      }]
    }],
    playListIndex: 0,
    isPause: true,
    detailShow: false,
    lyricList: {},
    currentTime: 0,
    duration: 0,//歌曲总时长
  },
  getters: {
  },
  mutations: {
    updatePlay: function (state, value) {
      state.isPause = value;
    },
    updatePlayList: function (state, value) {
      state.playList = value;

    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;

    },

    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;

    },
    updateLyric: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {

      state.currentTime = value;
      console.log(state.currentTime);
    },
    updateDuration: function (state, value) {
      state.duration = value;
    },
    pushPlayList: function (state, value) {
      state.playList.push(value);
    },
  },
  actions: {
    getLyric: async function (content, value) {
      let res = await getSongLyric(value)
      // console.log(res);
      content.commit('updateLyric', res.data.lrc)
    },
  },
  modules: {
  }
})
