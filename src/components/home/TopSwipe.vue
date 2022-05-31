<template>
  <div id="topswipe">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import axios from "axios";
// import { getData } from "../../../request/api/home.js";
import { reactive, onMounted } from "vue";
//生命周期
export default {
  setup() {
    const state = reactive({
      images: [
        "https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    onMounted(async () => {
      axios.get("http://localhost:3000/banner?type=2").then((res) => {
        state.images = res.data.banners;
      });
    });
    return { state };
  },
};
</script>

<style lang="less">
#topswipe {
  .van-swipe {
    width: 100%;
    height: 3rem;

    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgba(247, 144, 75, 0.648);
    }
  }
}
</style>