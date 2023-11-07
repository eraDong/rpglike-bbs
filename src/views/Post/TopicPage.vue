<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { postRenderTopicService } from '@/api/post'

const postArr = ref([])
const route = useRoute()
const postRender = async (topic) => {
  postArr.value = await postRenderTopicService(topic)
}

onBeforeRouteUpdate((to) => {
  postRender(to.query.name)
})

postRender(route.query.name)
</script>

<template>
  <div class="title">#{{ route.query.name }}</div>
  <div><User-Post :postArr="postArr"></User-Post></div>
</template>

<style>
.title {
  margin-left: 56px;
  font-size: 35px;

  color: #888c8d;
  text-align: center;
}
</style>
