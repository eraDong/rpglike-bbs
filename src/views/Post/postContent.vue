<script setup>
import { postRenderIdService } from '@/api/post'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const postObj = ref('')
const postRenderId = async (postId) => {
  postObj.value = await postRenderIdService(postId)
}
postRenderId(route.query.id)
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div class="title">
        {{ postObj.title }}
        <span class="author">author:{{ postObj.author }}</span>
      </div>
      <div class="image" v-if="postObj.image !== null">
        <img :src="`/rpglike-server/${postObj.image}`" alt="" />
      </div>

      <div class="main">{{ postObj.content }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  margin: 0 auto;
  background-color: #0b1416;

  .content {
    margin-top: 80px;
    text-align: center;
    .title {
      margin-bottom: 50px;
      color: white;
      font-size: 25px;
      font-weight: 700;

      .author {
        font-weight: 400w;
        font-size: 12px;
        color: #999;
      }
    }
    .image {
      img {
        height: 350px;
        margin-bottom: 50px;
      }
    }

    .main {
      font-size: 16px;
      margin: 0 30px;
      color: #999;
    }
  }
}
</style>
