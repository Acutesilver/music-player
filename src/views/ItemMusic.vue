<template>
  <ItemMusicTop :playlist="state.playlist" />
  <ItemMusicList
    :itemlist="state.itemlist"
    :subscribedCount="state.playlist.subscribedCount"
  />
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList } from "../../request/api/item.js";
import { getItemList } from "../../request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单详情页数组
      itemlist: [], //歌曲
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res1 = await getMusicItemList(id);
      // console.log(res1);
      state.playlist = res1.data.playlist;
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
      // 防止页面刷新，数据丢失，可以保存到sessionStorage
      //获取歌单的歌曲
      let res2 = await getItemList(id);
      // console.log(res2);
      state.itemlist = res2.data.songs;
    });

    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
};
</script>