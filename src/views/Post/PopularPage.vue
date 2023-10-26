<script setup>
import { ref } from 'vue'

const imgArr = ref([
  { imgUrl: new URL('@/assets/test1.png', import.meta.url).href },
  { imgUrl: new URL('@/assets/test2.png', import.meta.url).href },
  { imgUrl: new URL('@/assets/test3.png', import.meta.url).href },
  { imgUrl: new URL('@/assets/test4.png', import.meta.url).href }
])
</script>

<template>
  <div class="img-browser">
    <!-- 走马灯展示热门帖子 -->
    <el-carousel :autoplay="false" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in imgArr" :key="index">
        <img class="carousel-image" :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <User-Post></User-Post>
</template>

<style lang="less" scoped>
// 走马灯
.img-browser {
  margin-bottom: 40px;
  margin-left: 75px;
  width: 1280px;
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    .carousel-image {
      width: 65%;
      height: 100%;
      border-radius: 25px;
    }

    // 样式穿透
    :deep(.el-carousel__mask) {
      background-color: transparent;
    }
  }
}
</style>
