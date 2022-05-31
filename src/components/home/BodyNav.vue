<!-- 功能区 -->
<template>
  <div class="bodyNav">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlegedan-"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diantai3"></use>
      </svg>
      <span>电台</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
      </svg>
      <span>直播</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-daochu1024-02"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bodyNav {
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1rem;
      height: 1rem;
      margin-top: 0.2rem;
      fill: black;
    }
  }
}
</style>