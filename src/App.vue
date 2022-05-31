<template>
  <router-view />
  <MusicPlayer />
</template>
<script>
import MusicPlayer from "@/components/item/MusicPlayer.vue";
export default {
  components: {
    MusicPlayer,
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.4rem;
  height: 0.4rem;
}
a {
  color: black;
}
</style>
