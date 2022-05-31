<template>
  <TopNav />
  <TopSwipe />
  <BodyNav />
  <MusicList />
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/home/TopNav.vue";
import TopSwipe from "@/components/home/TopSwipe.vue";
import BodyNav from "@/components/home/BodyNav.vue";
import MusicList from "@/components/home/MusicList.vue";
export default {
  name: "HomeView",
  components: {
    TopNav,
    TopSwipe,
    BodyNav,
    MusicList,
  },
};
</script>
<style lang="less">
body {
  background-color: white;
}
</style>
